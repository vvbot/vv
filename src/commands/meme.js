const axios = require("axios");
const { RichEmbed } = require("discord.js");

module.exports = {
    name: "meme",
    description: "Returns a simple text-based meme",
    args: false,
    usage: "",
    cooldown: 5,
    async execute(message, args, client, logger) {
        const meme = await axios.get("http://api.chew.pro/trbmb");
        const embed = new RichEmbed()
            .setTitle("Meme for the poor?")
            .setDescription(meme.data)
        client.fixEmbed(embed);        
        return message.channel.send(embed);
    }
}