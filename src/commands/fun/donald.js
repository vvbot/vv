const { Command } = require("discord-akairo");
const { get } = require("axios");

module.exports = class DonaldCommand extends Command {
    constructor() {
        super("donald", {
            aliases: ["donald"],
            description: "A random quote probably from Donald J. Trump.",
            typing: true
        });
    }

    async exec(msg) {
        let { data: trump } = await get("https://api.whatdoestrumpthink.com/api/v1/quotes/random");

        return msg.util.send(`> ${trump.message}\n- Donald Trump`);
    }
}