module.exports = {
    name: "hi.js",
    description: "hi",
    aliases: ["hello.js"],
    args: false,
    usage: "",
    cooldown: 5,
    hidden: true,
    execute(message, args, client, logger) {
        message.channel.send(`hewwowasd`)
    }
}