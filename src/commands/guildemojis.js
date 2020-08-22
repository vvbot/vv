module.exports = {
    name: "guildemojis",
    description: "Lists all emojis that can be found in the current server",
    args: false,
    usage: "",
    guildOnly: true,
    execute(message, args, client) {
        if(message.guild.emojis.cache.size <= 0) return message.channel.send("Yeah, this guild doesn't have any emojis... Sucks to suck.")
        return message.channel.send(message.guild.emojis.cache.map(e => e.toString()).join(" "));
    }
}