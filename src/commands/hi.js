module.exports = {
    name: "hi.js",
    description: "hi",
    aliases: ["hello.js"],
    args: false,
    usage: "",
    hidden: true,
    execute(message, args, client, logger) {
        return message.channel.send(`hewwo OwO`)
    }
}