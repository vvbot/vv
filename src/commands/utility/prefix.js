const { Command } = require("discord-akairo");

module.exports = class PrefixCommand extends Command {
    constructor() {
        super("prefix", {
            aliases: ["prefix", "start", "get-started"],
            description: "Lists my command prefixes.",
            typing: true
        });
    }

    exec(msg) {
        return msg.util.send(`You can use my commands by either:\n  •  using my default \`${this.client.prefix}\` prefix\n  •  mentioning me with ${msg.guild.me}`);
    }
}