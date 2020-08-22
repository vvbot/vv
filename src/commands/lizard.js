const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "lizard",
    description: "Gets lizard",
    usage: "",
    async execute(message, args, client) {
        const { url } = await client.goodNekos.lizard();
        const embed = new MessageEmbed()
            .setTitle("Lizard:")
            .setImage(url)
            .setFooter("Powered by nekos.life")

         .setColor(0xFF69B4);
        return message.channel.send(embed);
    }
}
