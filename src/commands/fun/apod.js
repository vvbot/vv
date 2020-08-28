const axios = require("axios");
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "apod",
    description: "Returns the Astronomy Picture of the Day",
    args: false,
    usage: "",
    async execute(message, args, client) {
        const apod = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${client.config.web.nasa}`);
        const embed = new MessageEmbed()
            .setTitle(`Astronomy Picture of the Day: ${apod.data.title}`)
            .setDescription(apod.data.explanation)
            .setImage(apod.data.hdurl)
            .setFooter(`Copyright ${apod.data.copyright}`)
            .setTimestamp(apod.data.date)
            .setColor(0xFF69B4)
        return message.channel.send(embed);
    }
}