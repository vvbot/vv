module.exports = {
    name: "prefix",
    description: "Lists all function prefixes valid for interactions with me.",
    args: false,
    usage: "",
    execute(message, args, client, logger) {
        message.channel.send(`You can utilise functions through me by using either the **${client.prefix}** or **${client.user}** prefix, or set one for yourself with **${client.prefix}settings set prefix [prefix]** or **${client.user}settings set prefix [prefix]**`)
    }
}