const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { get } = require("axios");

module.exports = class CatCommand extends Command {
    constructor() {
        super("cat", {
            aliases: ["cat"],
            description: "Gives you a picture of the best animal - a cat.",
            typing: true
        });
    }

    async exec(msg) {
        let { data: cat} = await get("https://api.chewey-bot.top/cat", { headers: { "Authorization": this.client.config.chewey_bot }});

        const embed = new MessageEmbed()
            .setImage(cat.data)
            .setFooter("Powered by api.chewey-bot.top")
            .setColor(this.client.color);

        return msg.util.send(embed);
    }
}