const { Listener } = require("discord-akairo");

module.exports = class DebugListener extends Listener {
    constructor() {
        super("debug", {
            emitter: "client",
            event: "debug"
        })
    }

    exec(ctx) {
       return this.client.debug ? this.client.logger.debug(ctx) : null; 
    }
}