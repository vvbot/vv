const axios = require("axios");
const { RichEmbed } = require("discord.js");

module.exports = {
    name: "dog",
    description: "Gives dog",
    usage: "",
    async execute(message, args, client, logger) {
        const dog = await axios.get("https://api.chewey-bot.top/dog", { headers: { "Authorization": client.config.web["chewey-bot"] }});
        const embed = new RichEmbed()
            .setTitle("Dog:")
            .setImage(dog.data.data)
            .setFooter("Powered by api.chewey-bot.ga")
        client.fixEmbed(embed);
        return message.channel.send(embed);
    }
}
