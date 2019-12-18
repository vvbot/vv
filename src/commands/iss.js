const axios = require("axios");
const { RichEmbed } = require("discord.js");

module.exports = {
    name: "iss",
    description: "Where is the ISS?",
    args: false,
    usage: "",
    guildOnly: false,
    async execute(message, args, client, logger) {
        const iss = await axios.get("https://api.wheretheiss.at/v1/satellites/25544")
        const embed = new RichEmbed()
            .setTitle("Current ISS Location Statistics:")
            .addField("Latitude:", iss.data.latitude)
            .addField("Longitude:", iss.data.longitude)
            .addField("Altitude:", iss.data.latitude)
            .addField("Velocity:", `${iss.data.velocity}km/h`)
            .addField("Visability:", iss.data.visibility)
            .addField("Footprint:", iss.data.footprint)
        client.fixEmbed(embed);
        message.channel.send(embed);
    }
}