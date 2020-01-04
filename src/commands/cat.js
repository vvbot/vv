const axios = require("axios");
const { RichEmbed } = require("discord.js");

module.exports = {
    name: "cat",
    description: "Gives cat",
    usage: "",
    async execute(message, args, client, logger) {
        const cat = await axios.get("https://api.chewey-bot.top/cat", { headers: { "Authorization": client.config.web["chewey-bot"] }});
        const embed = new RichEmbed()
            .setTitle("Cat:")
            .setImage(cat.data.data)
            .setFooter("Powered by api.chewey-bot.ga")
        client.fixEmbed(embed);
        return message.channel.send(embed);
    }
}
