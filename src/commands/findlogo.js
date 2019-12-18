const { RichEmbed } = require("discord.js");

module.exports = {
    name: "findlogo",
    description: "Returns the logo of the website / company provided",
    args: true,
    aliases: ["logo"],
    usage: "[WEBSITE OR COMPANY NAME]",
    async execute(message, args, client, logger) {
        const embed = new RichEmbed()
            .setTitle("Your logo is served:")
            .setImage(`https://logo.clearbit.com/${args[0]}`)
        client.fixEmbed(embed);
        return message.channel.send(embed);
    }
}