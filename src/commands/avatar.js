const { RichEmbed } = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Returns the avatar of the given user or yourself",
    usage: "[USERNAME OR MENTION (OPTIONAL)]",
    guildOnly: false,
    execute(message, args, client, logger) {
        const member = client.findMember(message, args[0], true);
        const embed = client.defualtEmbed
            .setTitle(`${member.displayName}'s avatar:`)
            .setColor("RANDOM")
            .setImage(member.user.displayAvatarURL)
        return message.channel.send(embed);
    }
}