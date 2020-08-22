const axios = require("axios");
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "space",
    description: "Gives space",
    usage: "",
    async execute(message, args, client) {
        const space = await axios.get("https://api.chewey-bot.top/space", { headers: { "Authorization": client.config.web["chewey-bot"] }});
        const embed = new MessageEmbed()
            .setTitle("Space:")
            .setImage(space.data.data)
            .setFooter("Powered by api.chewey-bot.top")
         .setColor(0xFF69B4);
        return message.channel.send(embed);
    }
}
