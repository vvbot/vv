const { Listener } = require("discord-akairo");

module.exports = class WarnListener extends Listener {
    constructor() {
        super("warn", {
            emitter: "client",
            event: "warn"
        })
    }

    exec(ctx) {
        return this.client.logger.warn(ctx);
    }
}