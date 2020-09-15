const { Command } = require("discord-akairo");

module.exports = class PingCommand extends Command {
    constructor() {
        super("ping", {
            aliases: ["ping"],
            description: "Pong. In all honestly though this is used to determine bot latency.",
            typing: true,
        });
    }

    async exec(msg) {
        const sent = await msg.util.send("Thanks for even caring <3");

        return sent.edit(`I'm suffering from a gateway delay of about **${this.client.ws.ping.toFixed(2)}ms**, and a message delay of **${(sent.createdTimestamp - msg.createdTimestamp).toFixed(2)}ms**.`);
    }
}