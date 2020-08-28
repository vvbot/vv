const { performance } = require("perf_hooks");

module.exports = {
    name: "rebuild_auto",
    description: "Rebuilds auto commands.",
    adminOnly: true,
    aliases: ["ra"],
    async execute(message, args, client) {
        const start = performance.now();

        let progress = await message.channel.send("Sweeping auto commands...");

        client.autoCommands.sweep(() => true);

        progress.edit("Clearing pattern array...");

        client.autoPatterns = [];

        progress.edit("Repopulating auto commands...");

        let autos = client.commands.filter(cmd => cmd.auto);
        let patterns = [];

        autos.each(cmd => {
            patterns = patterns.concat(cmd.patterns);
            cmd.patterns.forEach(p => {
                client.autoCommands.set(p, cmd);
            });
        });

        progress.edit("Repopulating pattern array...");
        client.autoPatterns = patterns;

        const end = performance.now();

        progress.edit(`Done. Rebuilt ${patterns.length} patterns and ${autos.size} commands in ${(end - start).toFixed(2)} ms.`);
    }
};