const { RichEmbed } = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Returns the avatar of the given user or yourself",
    usage: "[USERNAME OR MENTION (OPTIONAL)]",
    guildOnly: false,
    execute(message, args, client, logger) {
        const member = client.findMember(message, args[0], true);
        const embed = new RichEmbed
            .setTitle(`${member.displayName}'s avatar:`)
            .setImage(member.user.displayAvatarURL)
        client.fixEmbed(embed);
        return message.channel.send(embed);
    }
}