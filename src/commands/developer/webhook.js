const { Command } = require("discord-akairo");

module.exports = class WebhookCommand extends Command {
    constructor() {
        super("webhook", {
            aliases: ["webhook", "hook"],
            description: "Sends a message through one of **my** bots. Checkmate atheists.",
            ownerOnly: true,
            args: [
                {
                    id: "hook",
                    prompt: {
                        start: "Which hook should I use?"
                    },
                    type: "string",
                },
                {
                    id: "text",
                    prompt: {
                        start: "What should I send?"
                    },
                    type: "string",
                    match: "restContent"
                }
            ]
        });
    }

    exec(msg, { hook, text }) {
        this.client.webhooks[hook.replace("--", "").toUpperCase()].send(text);
        return msg.util.send("Success.");
    }
}