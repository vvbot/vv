const { Command } = require("discord-akairo");

module.exports = class WebhookCommand extends Command {
    constructor() {
        super("webhook", {
            aliases: ["webhook", "hook"],
            description: "Sends a message through one of **my** bots. Checkmate atheists.",
            ownerOnly: true,
            args: [
                {
                    id: "text",
                    prompt: {
                        start: "What should I send?"
                    },
                    type: "string"
                }
            ]
        });
    }

    exec(msg, args) {
        return this.client.webhooks.N.send(args.text);
    }
}