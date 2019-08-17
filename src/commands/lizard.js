const { RichEmbed } = require("discord.js");

module.exports = {
    name: "lizard",
    description: "Gets lizard",
    usage: "",
    async execute(message, args, client, logger) {
        const { url } = await client.nekos.lizard();
        const embed = new RichEmbed()
            .setTitle("Lizard:")
            .setImage(url)
            .setFooter("Powered by nekos.life")

        client.fixEmbed(embed);
        return message.channel.send(embed);
    }
}
