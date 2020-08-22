const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "neko",
    description: "Neko neko ni",
    usage: "",
    async execute(message, args, client) {
        const { url } = ((Math.floor(Math.random() * 2) + 1) == 1) ? await client.goodNekos.nekoGif() : await client.goodNekos.neko();
        const embed = new MessageEmbed()
            .setTitle("Neko:")
            .setImage(url)
            .setFooter("Powered by nekos.life")

         .setColor(0xFF69B4);
        return message.channel.send(embed);
    }
}
