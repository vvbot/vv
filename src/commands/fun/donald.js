const axios = require("axios");
const { MessageEmbed }= require("discord.js");

module.exports = {
    name: "donald",
    description: "Quotes from the one the only.",
    args: false,
    usage: "",
    async execute(message, args, client) {
        const trump = await axios.get("https://api.whatdoestrumpthink.com/api/v1/quotes/random");
        const embed = new MessageEmbed()
            .setTitle("Quotes from Trump:")
            .setDescription(`${trump.data.message} \n - Donald Trump`)
            .setColor(0xFF69B4);
        return message.channel.send(embed);
    }
}