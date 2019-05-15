const axios = require("axios");
const config = require("../../config.json");

module.exports = {
    name: "dog",
    description: "Gives dog",
    usage: "",
    async execute(message, args, client, logger) {
        const dog = await axios.get("https://api.chewey-bot.ga/dog", { headers: { "Authorization": config.web["chewey-bot"] }});
        const embed = client.defualtEmbed
            .setTitle("Dog:")
            .setImage(dog.data.data)
        return message.channel.send(embed);
    }
}