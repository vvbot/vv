module.exports = {
    name: "echo",
    description: "Repeats the given string",
    usage: "[-D (OPTIONAL - Will delete the original message)] [STRING]",
    guildOnly: false,
    execute(message, args, client, logger) {
        if(args[0].toLowerCase() === "-d") {
            if(message.channel.type === "dm") return message.channel.send("This function will not work here. Please try again in either a Guild or without the \`-D\` flag.")
            message.channel.send(args.slice(1).join(" "));
            message.delete();
        } else {
            message.channel.send(args.join(" "));
        }
    }
}