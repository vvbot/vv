const { DMChannel } = require("discord.js");

module.exports = {
    name: "echo",
    description: "Repeat after me",
    usage: "<someting>",
    guildOnly: true,
    execute(message, args, client) {
        if(args.length) {
            try {
                message.delete()
            } catch(e) {}

            return message.channel.send(args.join(" "));
        } else return;
    }
}