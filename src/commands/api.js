const { RichEmbed } = require("discord.js");

module.exports = {
    name: "api",
    description: "Information about sh0dan's API",
    args: true,
    usage: "",
    cooldown: 5,
    adminOnly: true,
    execute(message, args, client, logger) {
        const embed = new RichEmbed()
            .setTitle("sh0dan API")
            .setDescription("sh0dan has an API! It can be found right [here](https://api.shodanbot.com) and support can be found in the support guild.")
        client.fixEmbed(embed);
        message.channel.send(embed)
    }
}