const axios = require("axios");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "dog",
    description: "Gives dog",
    usage: "",
    async execute(message, args, client) {
        const dog = await axios.get("https://api.chewey-bot.top/dog", { headers: { "Authorization": client.config.web["chewey-bot"] }});
        const embed = new MessageEmbed()
            .setTitle("Dog:")
            .setImage(dog.data.data)
            .setFooter("Powered by api.chewey-bot.top")
            .setColor(0xFF69B4);
            
        return message.channel.send(embed);
    }
}
