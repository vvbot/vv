const { Command } = require("discord-akairo");
const { SnowflakeUtil } = require("discord.js");

module.exports = class SnowflakeCommand extends Command {
    constructor() {
        super("snowflake", {
            aliases: ["snowflake"],
            description: "Converts a snowflake to a human-readable timestamp.",
            typing: true,
            args: [
                {
                    id: "snowflake",
                    type: "string"
                }
            ]
        });
    }

    exec(msg, { snowflake }) {
        let deconstructed = SnowflakeUtil.deconstruct(snowflake);
        
        return msg.util.send(new Date(deconstructed.date).toUTCString());
    }
}