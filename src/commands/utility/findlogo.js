const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "findlogo",
    description: "Returns the logo of the website / company provided",
    args: true,
    aliases: ["logo"],
    usage: "[WEBSITE OR COMPANY NAME]",
    async execute(message, args, client) {
        const embed = new MessageEmbed()
            .setTitle("Your logo is served:")
            .setImage(`https://logo.clearbit.com/${args[0]}`)
            .setColor(0xFF69B4);
        return message.channel.send(embed);
    }
}