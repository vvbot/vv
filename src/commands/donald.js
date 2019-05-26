const axios = require("axios");
const { RichEmbed } = require("discord.js");

module.exports = {
    name: "donald",
    description: "Quotes from the one the only.",
    args: false,
    usage: "",
    cooldown: 5,
    async execute(message, args, client, logger) {
        const trump = await axios.get("https://api.whatdoestrumpthink.com/api/v1/quotes/random");
        const embed = new RichEmbed()
            .setTitle("Quotes from Trump:")
            .setDescription(`${trump.data.message} \n - Donald Trump`)
        client.fixEmbed(embed);
        return message.channel.send(embed);
    }
}