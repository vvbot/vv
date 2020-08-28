const axios = require("axios");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "birb",
    description: "Gives birb",
    aliases: ["bird"],
    usage: "",
    async execute(message, args, client) {
        const { data: birb} = await axios.get("https://api.chewey-bot.top/birb", { headers: { "Authorization": client.config.web["chewey-bot"] }});
        const embed = new MessageEmbed()
            .setTitle("Cat:")
            .setImage(birb.data)
            .setFooter("Powered by api.chewey-bot.top")
            .setColor(0xFF69B4);
        return message.channel.send(embed);
    }
}
