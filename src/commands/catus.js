const { RichEmbed } = require("discord.js");

module.exports = {
    name: "catus",
    description: "Returns cat version of the HTTP error provided",
    args: true,
    aliases: ["cat-error"],
    usage: "[HTTP ERROR CODE]",
    async execute(message, args, client, logger) {
        const embed = new RichEmbed()
            .setTitle("Your logo is served:")
            .setImage(`https://http.cat/${args[0]}`)
        client.fixEmbed(embed);
        return message.channel.send(embed);
    }
}