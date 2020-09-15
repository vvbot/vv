const { Listener } = require("discord-akairo");

module.exports = class commandFinishedListener extends Listener {
    constructor() {
        super("commandFinished", {
            emitter: "commandHandler",
            event: "commandFinished"
        });
    }

    exec(msg, cmd, reason) {
        this.client.commandsExecuted++;
        return;
    }
}