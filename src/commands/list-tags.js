const { RichEmbed } = require("discord.js");

module.exports = {
    name: "list-tags",
    description: "List top 20 user created functions (tags)",
    aliases: ["all-tags", "tags"],
    cooldown: 5,
    disabled: true,
    execute(message, args, client, logger) {
        const row = client.sql.query("SELECT tagName from tags LIMIT 20;", (error, rows, fields) => {
            let rowsEnd = [];
            rows.forEach(a => {
                rowsEnd.push(a.tagName.toLowerCase());
            });
            const embed = new RichEmbed()
                .setTitle("Latest User Tags:")
                .setDescription(rows.join("\r\n"))
            client.fixEmbed(embed);
            message.channel.send(embed);
            rowsEnd = [];
        });
    }
}