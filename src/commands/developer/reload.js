const { join } = require("path");
const { performance } = require("perf_hooks");

module.exports = {
    name: "reload",
    description: "Reload a command within the bot process",
    args: true,
    usage: "<command|all>",
    aliases: ["rl"],
    adminOnly: true,
    async execute(message, args, client) {
        if(args[0].toLowerCase() == "all" || args[0].toLowerCase() == "a") {
            let start = performance.now();

            let progress = await message.channel.send("Sweeping Commands...");

            let toReload = client.commands.array();

            client.commands.sweep(() => true);

            progress.edit("Commands swept. Scraping command directories...");

            toReload.forEach(c => {
                delete require.cache[require.resolve(`../${c.ABSOLUTE_PATH}`)];
                const cmd = require(`../${c.ABSOLUTE_PATH}`);
                
                cmd.category = c.category;
                cmd.ABSOLUTE_PATH = c.ABSOLUTE_PATH;
                client.commands.set(cmd.name, cmd);
            });
 
            let stop = performance.now();

            return progress.edit(`Done. Reloaded ${toReload.length} command${toReload.length > 1 ? "s" : ""} in ${(stop - start).toFixed(2)} ms. It's recommended you run \`${client.prefix}rebuild_auto\` now.`);
        } else {          
            let command = client.commands.get(args[0]);

            if (!command && client.commands.filter(c => c.aliases?.includes(args[0]))) command = client.commands.filter(c => c.aliases?.includes(args[0])).first();
            if (!command) return message.channel.send(`That command couldn't be found within my processes. Try loading it with \`${client.prefix}load ${args[0]}\``);

            delete require.cache[require.resolve(`../${command.ABSOLUTE_PATH}`)];
            client.commands.delete(command.name);

            const cmd = require(join(client.commandPath, `${command.ABSOLUTE_PATH}`));

            cmd.category = command.category;
            cmd.ABSOLUTE_PATH = command.ABSOLUTE_PATH;
            client.commands.set(cmd.name, cmd);

            return message.channel.send(`Successfully reloaded \`${cmd.name}\`. It's recommended you run \`${client.prefix}rebuild_auto\` now.`);
        }
    }
};