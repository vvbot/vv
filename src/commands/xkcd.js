const axios =  require("axios");
const { RichEmbed } = require("discord.js");

module.exports = {
    name: "xkcd",
    description: "xkcd comics",
    usage: "[MESSAGE]",
    cooldown: 5,
    async execute(message, args, client, logger) {
        let url;
        if(args.length) url = `https://xkcd.com/${args[0]}/info.0.json`;
        else url = `https://xkcd.com/info.0.json`;

        let data = await axios.get(url);
            data = data.data;

        const embed = new RichEmbed()
            .setTitle(data.title)
            .setDescription(data.alt)
            .setImage(data.img)
            .addField("Day", data.day, true)
            .addField("Comic \"#\"", true)
            .addField("Released", data.year, true)
            .setFooter("Based off the original code by Vox")
        client.fixEmbed(embed);

        message.channel.send(embed);
    }
}