const { DMChannel } = require("discord.js");

module.exports = {
    name: "echo",
    description: "Repeat after me",
    usage: "<someting>",
    guildOnly: true,
    execute(message, args, client) {
        if(args.length) {
            if(message.guild.me.permissionsIn(message.channel).has("MANAGE_MESSAGES")) message.delete();

            return message.channel.send(args.join(" "));
        } else return;
    }
}