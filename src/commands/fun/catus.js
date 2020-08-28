const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "catus",
    description: "Returns cat version of the HTTP error provided",
    args: true,
    aliases: ["cat-error"],
    usage: "[HTTP ERROR CODE]",
    async execute(message, args, client) {
        const embed = new MessageEmbed()
            .setTitle("Your logo is served:")
            .setImage(`https://http.cat/${args[0]}`)
            .setColor(0xFF69B4);
        return message.channel.send(embed);
    }
}