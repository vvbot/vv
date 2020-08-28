const { join } = require("path");
const { readdirSync } = require("fs");
const { performance } = require("perf_hooks");

module.exports = {
    name: "load",
    description: "Load a command into the bot process",
    usage: "<command|all>",
    args: true,
    aliases: ["l"],
    adminOnly: true,
    async execute(message, args, client) {
        if(args[0].toLowerCase() == "all" || args[0].toLowerCase() == "a") {
            let start = performance.now();

            let progress = await message.channel.send("Scraping command directories...");

            let Commands = [];
            let newCommands = 0;

            client.utils.getDirectories(join(__dirname, "..")).forEach(d => {
                if (d == "disabled") return;
                let commands = readdirSync(join(__dirname, "..", d)).filter(file => file.endsWith(".js")).map(path => `${d}/${path}`);
                Commands = Commands.concat(...commands);
                progress.edit(`Scraped ${commands.length} commands from directories. Loading them...`);
            });

            if(client.commands.size == Commands.size) {
                progress.edit("There are no available commands to load. This probably means that all commands are already loaded, but it could also mean I broke.")
            }

            for (const File of Commands) {
                const cmd = require(`../${File}`);
                let category = File.split("/")[0];

                if (cmd.auto && cmd.patterns) {
                   cmd.patterns.forEach(p => {
                        client.autoCommands.set(p, cmd);
                        client.autoPatterns.push(p);
                    });

                    cmd.ABSOLUTE_PATH = File;
                    cmd.category = category;
                    client.commands.set(cmd.name, cmd);
                }


                cmd.ABSOLUTE_PATH = File;
                cmd.category = category;

                if (cmd.category == "developer" && !cmd.adminOnly) cmd.adminOnly = true;

                client.commands.set(cmd.name, cmd);
                newCommands++;
            }

            let stop = performance.now();

            return progress.edit(`Done. Loaded ${newCommands} new command${newCommands > 1 ? "s" : ""} in ${(stop - start).toFixed(2)} ms. It's recommended to run \`${client.prefix}rebuild_auto\` now.`);

        } else {
            let Commands = [];

            if(client.commands.get(args[0])) return message.channel.send("That command has already been loaded.");

            client.utils.getDirectories(join(__dirname, "..")).forEach(d => {
                let commands = readdirSync(join(__dirname, "..", d)).filter(file => file.endsWith(".js")).map(path => `${d}/${path}`);
                Commands = Commands.concat(...commands);
            });

            let [path] = Commands.filter(c => c.endsWith(`/${args[0]}.js`));
            delete require.cache[require.resolve(`../${path}`)];
            
            let cmd = require(`../${path}`);
            let category = path.split("/")[0];

            if(cmd.auto && cmd.patterns) {
                cmd.patterns.forEach(p => {
                    client.autoCommands.set(p, cmd);
                    client.autoPatterns.push(p);

                    cmd.ABSOLUTE_PATH = File;
                    cmd.category = category;
                    client.commands.set(cmd.name, cmd);
                });
            }

            cmd.ABSOLUTE_PATH = path;
            cmd.category = category;
            client.commands.set(cmd.name, cmd);

            return message.channel.send(`Successfully loaded \`${cmd.name}\`. It's recommended to run \`${client.prefix}rebuild_auto\` now.`);
        }
    }
};