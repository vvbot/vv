module.exports = {
    name: "steal-emojis",
    description: "Takes emojis from the current server and adds them to the \"Poorly Managed Dumpster\"",
    args: false,
    cooldown: 5,
    adminOnly: true,
    async execute(message, args, client, logger, Discord) {
        const pmd = client.guilds.find(g => g.name == "Poorly Managed Dumpster");
        msg.guild.emojis.array().forEach(e => {
            if (pmd.emojis.map(e => e.name).includes(e.name)) {
                return message.channel.send("That emoji already exists in my server.");
            };
            pmd.createEmoji(e.url, e.name).then(em => {
                pmd.channels.find(c => c.name.startsWith("jahneral")).send(`Successfully stole **${em.name}** (${em}) from **${msg.guild.name}**`);
            });
        });
    }
}