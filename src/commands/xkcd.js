const axios =  require("axios");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "xkcd",
    description: "xkcd comics",
    usage: "[MESSAGE]",
    async execute(message, args, client) {
        let url;
        if (args.length) url = `https://xkcd.com/${args[0]}/info.0.json`;
        else url = `https://xkcd.com/info.0.json`;

        let result = await axios.get(url);

        const embed = new MessageEmbed()
            .setTitle(result.data.title)
            .setDescription(result.data.alt)
            .setImage(result.data.img)
            .addField("Day", result.data.day, true)
            .addField("Comic \"#\"", result.data.num, true)
            .addField("Released", result.data.year, true)
            .setColor(0xFF69B4);
        
        message.channel.send(embed);
    }
}