const { Listener } = require("discord-akairo");

module.exports = class MessageListener extends Listener {
    constructor() {
        super("message", {
            emitter: "client",
            event: "message"
        });
    }

    exec() {
        this.client.messagesSeen++;
        return;
    }
}