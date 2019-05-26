const axios = require("axios");
const config = require("../../config.json");
const { RichEmbed } = require("discord.js");

module.exports = {
    name: "dog",
    description: "Gives dog",
    usage: "",
    async execute(message, args, client, logger) {
        const dog = await axios.get("https://api.chewey-bot.ga/dog", { headers: { "Authorization": config.web["chewey-bot"] }});
        const embed = new RichEmbed()
            .setTitle("Dog:")
            .setImage(dog.data.data)
        client.fixEmbed(embed);
        return message.channel.send(embed);
    }
}