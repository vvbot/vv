const { Listener } = require("discord-akairo");

const presence = require("../util/presence");
const { randomItem } = require("../util/utils");

module.exports = class ReadyListener extends Listener {
    constructor() {
        super("ready", {
            emitter: "client",
            event: "ready"
        });
    }

    async exec() {
        this.client.logger.info("VV is online.");
        this.client.logger.info(`Prefix has been set to ${this.client.prefix}`);
        this.client.logger.info(`Program Version: ${"v" + this.client.version}`);
        this.client.logger.info(`Node Version: ${process.version}`);

        if (this.client.debug) this.client.logger.debug(grey("Started in DEBUG MODE"));

        await this.client.user.setActivity(randomItem(presence));
        
        setInterval(async () => {
            await this.client.user.setActivity(randomItem(presence));
        }, this.client.presenceDelay);
    }
}