const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { get } = require("axios");

const { shorten } = require("../../util/utils");

module.exports = class APODCommand extends Command {
    constructor() {
        super("apod", {
            aliases: ["apod"],
            description: "Returns NASA's astronomy picture of the day.",
            typing: true
        });
    }

    async exec(msg) {
        let apod = await get(`https://api.nasa.gov/planetary/apod?api_key=${this.client.config.nasa}`);

        const embed = new MessageEmbed()
            .setTitle(`Astronomy Picture of the Day: ${apod.data.title}`)
            .setDescription(shorten(apod.data.explanation, 2000))
            .setImage(apod.data.hdurl)
            .setFooter(`Copyright ${apod.data.copyright}`)
            .setTimestamp(apod.data.date)
            .setColor(this.client.color);

        return msg.util.send(embed);
    }
}