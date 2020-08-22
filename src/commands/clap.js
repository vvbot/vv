module.exports = {
    name: "clap",
    description: "Adds some 👏 to your strings",
    args: true,
    usage: "[STRING]",
    execute(message, args, client) {
        return message.channel.send(args.join(" 👏 "));
    }
}