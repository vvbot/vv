const { RichEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Ping pong ding dong",
    aliases: ["pong"],
    args: false,
    usage: "",
    cooldown: 5,
    guildOnly: false,
    async execute(message, args, client, logger) {
        const sent = await message.channel.send("Ponging...");
        const embed = new RichEmbed()
            .setTitle("Pong!")
            .addField("Gateway:", client.ping.toFixed(2) + "ms", true)
            .addField("Message:", sent.createdTimestamp - message.createdTimestamp + "ms", true)
        client.fixEmbed(embed);
        return sent.edit(embed);
    }
}