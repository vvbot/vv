const { RichEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
    name: "ow",
    description: "Returns statistics of specified OverWatch profile",
    aliases: ["overwatch"],
    args: true,
    usage: "[PC|XBL|PSN] [NA|EU|KR] [BATTLE TAG]",
    guildOnly: true,
    async execute(message, args, client, logger) {
        if(!args.length) return;
        if (!["pc", "xbl", "psn"].includes(args[0].toLowerCase())) return message.reply("please choose a valid platform! `PC`, `XBL`, and `PSN` are currently accepted.");
        if (!["na", "eu", "kr"].includes(args[1].toLowerCase())) return message.reply("please choose a valid region! `NA`, `EU`, and `KR` are currently accepted.");
        if(!args[2]) return message.reply("please provide a valid BattleTag! Example: `NISCU42#11305`")
        else args[2] = args[2].replace("#", "-");

        const request = await axios.get(`https://ow-api.com/v1/stats/${args[0].toLowerCase()}/${args[1].toLowerCase()}/${args[2]}/profile/`)
        ow = JSON.parse(request);

        const embed = new RichEmbed()
            .setTitle(`Profile for ${ow.name}`)
            .setColor("RANDOM")
            .setThumbnail(ow.ratingIcon)
            .addField("Level:", ow.level, true)
            .addField("Rating:", ow.ratingName, true)
            .addField("Total Games Won:", ow.gamesWon, true)
            .addField("Cards Won:", `**${ow.quickPlayStats.awards.cards}**`, true)
            .addField("Bronze Medals Won:", `**${ow.quickPlayStats.awards.medalsBronze}**`, true)
            .addField("Silver Medals Won:", `**${ow.quickPlayStats.awards.medalsSilver}**`, true)
            .addField("Gold Medals Won:", `**${ow.quickPlayStats.awards.medalsGold}**`, true)

        return message.channel.send(embed);
    }
}