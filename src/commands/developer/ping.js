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
        const sent = await message.channel.send("Thanks for even caring <3");

        return sent.edit(`I'm suffering from a gateway delay of about **${client.ws.ping.toFixed(2)}ms**, and a message delay of **${(sent.createdTimestamp - message.createdTimestamp).toFixed(2)}ms**.`);
    }
}
