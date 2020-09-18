const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { get } = require("axios");

module.exports = class SpaceCommand extends Command {
    constructor() {
        super("space", {
            aliases: ["space"],
            description: "Gives you a picture of a dog.",
            typing: true
        });
    }

    async exec(msg) {
        let { data: space} = await get("https://api.chewey-bot.top/space", { headers: { "Authorization": this.client.config.chewey_bot }});

        const embed = new MessageEmbed()
            .setImage(space.data)
            .setFooter("Powered by api.chewey-bot.top")
            .setColor(this.client.color);

        return msg.util.send(embed);
    }
}