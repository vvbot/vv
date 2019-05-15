const axios = require("axios");
const config = require("../../config.json");

module.exports = {
    name: "cat",
    description: "Gives cat",
    usage: "",
    async execute(message, args, client, logger) {
        const cat = await axios.get("https://api.chewey-bot.ga/cat", { headers: { "Authorization": config.web["chewey-bot"] }});
        const embed = client.defualtEmbed
            .setTitle("Cat:")
            .setImage(cat.data.data)
        return message.channel.send(embed);
    }
}