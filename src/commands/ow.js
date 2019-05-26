const { RichEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
    name: "ow",
    description: "Returns statistics of specified OverWatch profile",
    aliases: ["overwatch"],
    args: true,
    usage: "[PC|XBL|PSN] [NA|EU|KR] [BATTLE TAG]",
    guildOnly: false,
    async execute(message, args, client, logger) {
        if(!args.length) return;
        if (!["pc", "xbl", "psn"].includes(args[0].toLowerCase())) return message.reply("please choose a valid platform! `PC`, `XBL`, and `PSN` are currently accepted.");
        if (!["na", "eu", "kr"].includes(args[1].toLowerCase())) return message.reply("please choose a valid region! `NA`, `EU`, and `KR` are currently accepted.");
        if(!args[2]) return message.reply("please provide a valid BattleTag! Example: `NISCU42#11305`")
        else args[2] = args[2].replace("#", "-");

        const ow = await axios.get(`https://ow-api.com/v1/stats/${args[0].toLowerCase()}/${args[1].toLowerCase()}/${args[2]}/profile/`)

        if(ow.data.error) return message.channel.send("That player could not be found.");

        const embed = new RichEmbed()
            .setTitle(`Profile for ${ow.data.name}`)
            .setThumbnail(ow.data.ratingIcon ? ow.data.ratingIcon : ow.data.icon)
            .addField("Level:", ow.data.level, true)
            .addField("Rating:", ow.data.ratingName ? ow.data.ratingName : "No rating", true)
            .addField("Total Games Won:", ow.data.gamesWon, true)
            .addField("Cards Won:", ow.data.quickPlayStats.awards.cards, true)
            .addField("Bronze Medals Won:", ow.data.quickPlayStats.awards.medalsBronze, true)
            .addField("Silver Medals Won:",ow.data.quickPlayStats.awards.medalsSilver, true)
            .addField("Gold Medals Won:", ow.data.quickPlayStats.awards.medalsGold, true)

        client.fixEmbed(embed);
        message.channel.send(embed);
    }
}