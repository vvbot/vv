module.exports = {
    name: "guildemojis",
    description: "Lists all emojis that can be found in the current server.",
    args: false,
    usage: "",
    cooldown: 5,
    guildOnly: true,
    execute(message, args, client, logger) {
        return message.channel.send(message.guild.emojis.map(e => e.toString()).join(" "));
    }
}