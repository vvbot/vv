module.exports = {
    name: "reverse",
    description: "Reverses the given string.",
    args: true,
    usage: "[STRING]",
    cooldown: 5,
    guildOnly: false,
    execute(message, args, client, logger) {
        if(args.length > 1) args = args.join(" ");
        logger.log("info", args);
        message.channel.send(`${args.split("").reverse().join("")}`)
    }
}