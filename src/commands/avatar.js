const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "avatar",
    description: "Returns the avatar of either the supplied user or yourself",
    usage: "[USERNAME OR MENTION (OPTIONAL)]",
    guildOnly: false,
    execute(message, args, client) {
        const member = client.findMember(message, args[0], true);
        const embed = new MessageEmbed()
            .setTitle(`${member.displayName}'s avatar:`)
            .setImage(member.user.displayAvatarURL)
            .setColor(0xFF69B4)
        return message.channel.send(embed);
    }
}