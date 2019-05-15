const axios = require("axios");

module.exports = {
    name: "meme",
    description: "Returns a simple text-based meme",
    args: false,
    usage: "",
    cooldown: 5,
    async execute(message, args, client, logger) {
        const meme = await axios.get("http://api.chew.pro/trbmb");
        const embed = client.defualtEmbed
            .setTitle("Meme for the poor?")
            .setDescription(meme.data)
        return message.channel.send(embed);
    }
}