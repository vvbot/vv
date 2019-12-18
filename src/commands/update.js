const { RichEmbed } = require("discord.js");

module.exports = {
    name: "update",
    description: "Get info about the latest update or a specific update",
    usage: "[ID (OPTIONAL)]",
    async execute(message, args, client, logger) {
        if(args.length) {
            const [rows, error] = await client.sql.execute("SELECT * FROM updates WHERE id = ?", [args[0]]);
            if (error) throw error;
            const embed = new RichEmbed()
                .setTitle(`Update v${args[0]}`)
                .setDescription(`**Title:** ${rows[0].title}\n\n**Description:** ${rows[0].description}`)
            client.fixEmbed(embed);
            return message.channel.send(embed);
        } else { 
            const [error, rows] = await client.sql.query("SELECT * FROM updates ORDER BY id DESC LIMIT 1");
            if (error) throw error;
            const embed = new RichEmbed()
                .setTitle(`Update v${rows[0].id} - ${rows[0].title}`)
                .setDescription(`**Description:** ${rows[0].description}`)
            client.fixEmbed(embed);
            return message.channel.send(embed);
        }
    }
}