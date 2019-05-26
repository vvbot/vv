const { RichEmbed } = require("discord.js");

module.exports = {
    name: "update",
    description: "Get info about the latest update or a specific update",
    usage: "[ID (OPTIONAL)]",
    cooldown: 5,
    async execute(message, args, client, logger) {
        if(args.length) {
            client.sql.query(`SELECT * FROM updates WHERE id = ${args[0]}`, (error, rows, fields) => {
                if (error) throw error;
                const embed = new RichEmbed()
                    .setTitle(`Update v${args[0]}`)
                    .setDescription(`**Title:** ${rows[0].title}\n\n**Description:** ${rows[0].description}`)
                client.fixEmbed(embed);
                return message.channel.send(embed);
            })
        } else {
            client.sql.query(`SELECT * FROM updates ORDER BY id DESC LIMIT 1`, (error, rows, fields) => {
                if (error) throw error;
                const embed = new RichEmbed()
                    .setTitle(`Update v${rows[0].id}`)
                    .setDescription(`**Title:** ${rows[0].title}\n\n**Description:** ${rows[0].description}`)
                client.fixEmbed(embed);
                return message.channel.send(embed);
            });
        }
    }
}