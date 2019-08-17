const { RichEmbed } = require("discord.js");

module.exports = {
    name: "neko",
    description: "Neko neko ni",
    usage: "",
    async execute(message, args, client, logger) {
        const { url } = ((Math.floor(Math.random() * 2) + 1) == 1) ? await client.nekos.nekoGif() : await client.nekos.neko();
        const embed = new RichEmbed()
            .setTitle("Neko:")
            .setImage(url)
            .setFooter("Powered by nekos.life")

        client.fixEmbed(embed);
        return message.channel.send(embed);
    }
}
