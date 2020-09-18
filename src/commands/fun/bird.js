const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { get } = require("axios");

module.exports = class BirdCommand extends Command {
    constructor() {
        super("bird", {
            aliases: ["bird", "birb"],
            description: "Gives you a picture of a beautiful bird of paradise.",
            typing: true
        });
    }

    async exec(msg) {
        let { data: birb} = await get("https://api.chewey-bot.top/birb", { headers: { "Authorization": this.client.config.chewey_bot }});

        const embed = new MessageEmbed()
            .setImage(birb.data)
            .setFooter("Powered by api.chewey-bot.top")
            .setColor(this.client.color);

        return msg.util.send(embed);
    }
}