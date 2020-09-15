const { Command } = require("discord-akairo");

module.exports = class GuildEmojisCommand extends Command {
    constructor() {
        super("guildemojis", {
            aliases: ["guildemojis"],
            description: "Returns all of the current guild's emojis.",
            channel: "guild",
            typing: true,
        });
    }

    exec(msg) {
        if (msg.guild.emojis.cache.size <= 0) return msg.util.send("Yeah, this guild doesn't have any emojis... Sucks to suck.")
        return msg.util.send(msg.guild.emojis.cache.map(e => e.toString()).join(" "));
    }
}