const axios = require("axios");
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "iss",
    description: "Where is the ISS?",
    args: false,
    usage: "",
    guildOnly: false,
    async execute(message, args, client) {
        const iss = await axios.get("https://api.wheretheiss.at/v1/satellites/25544")
        const embed = new MessageEmbed()
            .setTitle("Current ISS Location Statistics:")
            .addField("Latitude:", iss.data.latitude)
            .addField("Longitude:", iss.data.longitude)
            .addField("Altitude:", iss.data.latitude)
            .addField("Velocity:", `${iss.data.velocity}km/h`)
            .addField("Visability:", iss.data.visibility)
            .addField("Footprint:", iss.data.footprint)
         .setColor(0xFF69B4);
        message.channel.send(embed);
    }
}