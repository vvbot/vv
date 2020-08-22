const { MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
    name: "ping",
    description: "Ping pong ding dong",
    aliases: ["pong"],
    args: false,
    usage: "",
    guildOnly: false,
    async execute(message, args, client) {
        const sent = await message.channel.send("Translating \"A Clockwork Orange\"...");

        const embed = new MessageEmbed()
            .setTitle("Pong!")
            .addField("Gateway:", client.ping.toFixed(2) + "ms", true)
            .addField("Message:", sent.createdTimestamp - message.createdTimestamp + "ms", true)
            .setColor(0xFF69B4);
        return sent.edit("", embed);
    }
}
