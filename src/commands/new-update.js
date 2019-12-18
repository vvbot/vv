const { RichEmbed } = require("discord.js");

module.exports = {
    name: "new-update",
    description: "Creates a new update tile for my online interface.",
    args: true,
    usage: "[TITLE] [DESCRIPTION]",
    adminOnly: true,
    async execute(message, args, client, logger) {        
        args = args.join(" ").split('" "');
        const embed = new RichEmbed()
            .setTitle(`New Update - ${args[0].replace(/"/g, "")}`)
            .setDescription(args[1].replace(/"/g, "").replace(/<code>|<\/code>/g, "`"))
        client.fixEmbed(embed);

        const [rows, error] = await client.sql.execute("INSERT INTO `updates` (title, description) VALUES (?, ?)", [args[0].replace(/"/g, ""), args[1].replace(/"/g, "")]).catch(console.log);
        message.channel.send("Successfully pushed update.");
        return client.webhooks.AGC.send(embed);
    }
}
