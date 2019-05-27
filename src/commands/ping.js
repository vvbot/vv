module.exports = {
    name: "ping",
    description: "Ping pong ding dong",
    aliases: ["pong"],
    args: false,
    usage: "",
    cooldown: 5,
    guildOnly: false,
    execute(message, args, client, logger) {
        message.channel.send(`Pong! Heartbeat: **${client.ping.toFixed(2)}**`)
    }
}