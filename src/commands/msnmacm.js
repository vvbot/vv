const axios = require("axios");
const { RichEmbed } = require("discord.js");

module.exports = {
    name: "msnmacm",
    description: "Indexes the MSNMACM network (https://msnmacm.org).",
    args: true,
    usage: "[INDEX]",
    cooldown: 5,
    async execute(message, args, client, logger) { 
        const { data: res, headers } = await axios({
            url: `https://msnmacm.org/_${Number(args[0])}`,
            headers: { 
                "Response-Type": "application/json"
            }
        });

        const embed = new RichEmbed()
            .setTitle(`Index ${args[0]}${res.title != null ? " - " + res.title : ""}`)
            .addField(`Abilit${res.abilities.split(",") > 1 ? "ies" : "y"}:`, res.abilities, true)
            .addField("Alliances", res.alliances, true)
            .addField("Last Known Location:", res.last_location != "undefined" ? res.last_location : "Unknown", true)
            .setDescription(`**Desc.**: ${res.abilities_description}\n\n**Notes**: ${res.notes}`)
            .setFooter("msnmacm.org")
        client.fixEmbed(embed);
        message.channel.send(embed);
    }
}
