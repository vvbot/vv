const axios = require("axios");
const { RichEmbed } = require("discord.js")

module.exports = {
    name: "apod",
    description: "Returns the Astronomy Picture of the Day",
    args: false,
    usage: "",
    cooldown: 5,
    async execute(message, args, client, logger) {
        const apod = await axios.get("https://api.nasa.gov/planetary/apod?api_key=H4CFOXuqE5jfle1VkvMDhoLBfRboxyOlC2VncL2m");
        const embed = new RichEmbed()
            .setTitle(`Astronomy Picture of the Day: ${apod.data.title}`)
            .setDescription(apod.data.explanation)
            .setImage(apod.data.hdurl)
            .setFooter(`Copyright ${apod.data.copyright}`)
            .setTimestamp(apod.data.date)
        client.fixEmbed(embed)
        return message.channel.send(embed);
    }
}