const axios = require("axios");
const { RichEmbed } = require("discord.js");

module.exports = {
    name: "birb",
    description: "Gives birb",
    aliases: ["bird"],
    usage: "",
    async execute(message, args, client, logger) {
        const { data: birb} = await axios.get("https://api.chewey-bot.top/birb", { headers: { "Authorization": client.config.web["chewey-bot"] }});
        const embed = new RichEmbed()
            .setTitle("Cat:")
            .setImage(birb.data)
            .setFooter("Powered by api.chewey-bot.ga")
        client.fixEmbed(embed);
        return message.channel.send(embed);
    }
}
