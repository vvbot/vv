const axios = require("axios");
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "meme",
    description: "Returns a simple text-based meme",
    args: false,
    usage: "",
    async execute(message, args, client) {
        const meme = await axios.get("http://api.chew.pro/trbmb");
        const embed = new MessageEmbed()
            .setTitle("Meme for the poor?")
            .setDescription(meme.data)
         .setColor(0xFF69B4);        
        return message.channel.send(embed);
    }
}