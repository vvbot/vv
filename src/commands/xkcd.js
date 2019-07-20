const axios =  require("axios");
const { RichEmbed } = require("discord.js");

module.exports = {
    name: "xkcd",
    description: "xkcd comics",
    usage: "[MESSAGE]",
    cooldown: 5,
    async execute(message, args, client, logger) {
        let url;
        if (args.length) url = `https://xkcd.com/${args[0]}/info.0.json`;
        else url = `https://xkcd.com/info.0.json`;

        let result = await axios.get(url);

        const embed = new RichEmbed()
            .setTitle(result.data.title)
            .setDescription(result.data.alt)
            .setImage(result.data.img)
            .addField("Day", result.data.day, true)
            .addField("Comic \"#\"", result.data.num, true)
            .addField("Released", result.data.year, true)
            .setFooter("Based off the original code by Vox")
        client.fixEmbed(embed);

        message.channel.send(embed);
    }
}