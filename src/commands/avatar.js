const { RichEmbed } = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Returns the avatar of the given user or yourself",
    args: true,
    usage: "[USERNAME OR MENTION (Optional)]",
    guildOnly: false,
    hidden: true,
    adminOnly: true,
    disabled: true,
    execute(message, args, client, logger) {
        const embed = new RichEmbed()
            .setColor("RANDOM")
            .setImage(args[0] ? client.users.get(args[0].match(client.regexs.mention)).displayAvatarURL : message.author.displayAvatarURL)
            logger.log("info", client.users.get(args[0]));
            return message.channel.send(message.author.displayAvatarURL);
    }
}