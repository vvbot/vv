module.exports = {
    name: "reverse",
    description: "Reverses the given string",
    args: true,
    usage: "[STRING]",
    guildOnly: false,
    disabled: true,
    execute(message, args, client) {
        if(args.length > 1) args = args.join(" ");
        message.channel.send(args.split("").reverse().join(""));
    }
}