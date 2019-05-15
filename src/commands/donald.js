const axios = require("axios");

module.exports = {
    name: "donald",
    description: "Quotes from the one the only.",
    args: false,
    usage: "",
    cooldown: 5,
    async execute(message, args, client, logger) {
        const trump = await axios.get("https://api.whatdoestrumpthink.com/api/v1/quotes/random");
        const embed = client.defualtEmbed
            .setTitle("Quotes from Trump:")
            .setDescription(`${trump.data.message} \n - Donald Trump`)
        return message.channel.send(embed);
    }
}