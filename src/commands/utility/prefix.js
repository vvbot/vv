const { Command } = require("discord-akairo");
const { stripIndents } = require("common-tags");

module.exports = class PrefixCommand extends Command {
    constructor() {
        super("prefix", {
            aliases: ["prefix", "start", "get-started"],
            description: "Lists my command prefixes.",
            typing: true
        });
    }

    exec(msg) {
        return msg.util.send(stripIndents`
            You can use my commands by either:
              •  mentioning me with ${msg.guild.me}
              •  using my default \`${this.client.prefix}\` prefix
        `);
    }
}