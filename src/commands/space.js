const axios = require("axios");
const config = require("../../config.json");

module.exports = {
    name: "space",
    description: "Gives space",
    usage: "",
    async execute(message, args, client, logger) {
        const space = await axios.get("https://api.chewey-bot.ga/space", { headers: { "Authorization": config.web["chewey-bot"] }});
        const embed = client.defualtEmbed
            .setTitle("Space:")
            .setImage(space.data.data)
        return message.channel.send(embed);
    }
}