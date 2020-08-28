const { performance } = require("perf_hooks");

module.exports = {
    name: "unload",
    description: "Unload a command from the bot process",
    args: true,
    usage: "<command|all>",
    aliases: ["ul"],
    adminOnly: true,
    async execute(message, args, client) {
        if(args[0].toLowerCase() == "all" || args[0].toLowerCase() == "a") {
            let start = performance.now();

            let commands = client.commands.filter(c => c.category != "developer");

            let progress = await message.channel.send("Clearing `require` cache...");

            client.commands.each(async c => {
                if(c.category == "developer") return;

                delete require.cache[require.resolve(`../${c.ABSOLUTE_PATH}`)];
            });
            
            progress.edit("Cleared `require` cache.")
            progress.edit("Sweeping commands...");

            client.commands.sweep(c => c.category != "developer");
            client.autoCommands.sweep(() => true);
            client.autoPatterns = [];

            let stop = performance.now();
            
            return progress.edit(`Done. Unloaded ${commands.size} command${commands.size > 1 ? "s" : ""} in ${(stop - start).toFixed(2)} ms. It's recommended you run \`${client.prefix}rebuild_auto\` now.`);
        } else {           
            let command = client.commands.get(args[0]);

            if(command.auto) {
                client.autoCommands.sweep(cmd => cmd.name == command.name);
                client.autoPatterns = client.autoPatterns.filter(p => !command.patterns.includes(p));
            }

            if (!command) return message.channel.send("That command couldn't be found within me.");

            client.commands.delete(command.name);
            delete require.cache[require.resolve(`../${command.ABSOLUTE_PATH}`)];

            return message.channel.send(`Successfully unloaded \`${command.name}\`. It's recommended you run \`${client.prefix}rebuild_auto\` now.`);
        }
    }
};