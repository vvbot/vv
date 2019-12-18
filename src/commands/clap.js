module.exports = {
    name: "clap",
    description: "Adds some 👏 to your strings",
    aliases: ["clapme"],
    args: true,
    usage: "[STRING]",
    execute(message, args, client, logger) {
        return message.channel.send(args.join(" 👏 "));
    }
}