const axios = require("axios");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "cat",
    description: "Gives cat",
    usage: "",
    async execute(message, args, client) {
        const cat = await axios.get("https://api.chewey-bot.top/cat", { headers: { "Authorization": client.config.web["chewey-bot"] }});
        const embed = new MessageEmbed()
            .setTitle("Cat:")
            .setImage(cat.data.data)
            .setFooter("Powered by api.chewey-bot.top")
            .setColor(0xFF69B4);
        return message.channel.send(embed);
    }
}
