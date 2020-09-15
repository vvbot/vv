const { Inhibitor } = require("discord-akairo");

module.exports = class BlacklistInhibitor extends Inhibitor {
    constructor() {
        super("blacklist", {
            reason: "blacklist"
        });
    }

    exec(message) {
        const blacklist = this.client?.blacklist || [];
        return blacklist.includes(message.author.id);
    }
}