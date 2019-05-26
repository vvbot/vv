const axios = require("axios");
const config = require("../../config.json");
const { RichEmbed } = require("discord.js");

module.exports = {
    name: "cat",
    description: "Gives cat",
    usage: "",
    async execute(message, args, client, logger) {
        const cat = await axios.get("https://api.chewey-bot.ga/cat", { headers: { "Authorization": config.web["chewey-bot"] }});
        const embed = new RichEmbed()
            .setTitle("Cat:")
            .setImage(cat.data.data)
        client.fixEmbed(embed);
        return message.channel.send(embed);
    }
}