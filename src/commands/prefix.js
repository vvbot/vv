module.exports = {
    name: "prefix",
    description: "Lists all function prefixes valid for interactions with me.",
    args: false,
    usage: "",
    execute(message, args, client) {
        message.channel.send(`Use me with a **${client.prefix}**`)
    }
}