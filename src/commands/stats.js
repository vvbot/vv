const { MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
    name: "stats",
    description: "On the doot statistics.",
    aliases: ["statistics"],
    async execute(message, args, client) {
        const sent = await message.channel.send("Doing de maffs...");

        /*
        const { data: updated } = await axios({
            url: "https://api.github.com/repos/axelgreavette/sh0dan/commits",
            method: "get",
            headers: {
                "User-Agent": "sh0dan"
            }
        }); */

        const embed = new MessageEmbed()
            .addField("Bot Stats­", `Channels: **${client.channels.cache.size}**\nUsers: **${client.users.cache.size}**\nGuilds: **${client.guilds.cache.size}**\nCommands: **${client.commands.size}**`, true)
            .addField("­", `Gateway: **${client.ws.ping.toFixed(2)}ms**\nMessage: **${sent.createdTimestamp - message.createdTimestamp}ms**\nUptime: **${client.uptime().formatted}**\nRAM: **${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB**`, true)
            //.setFooter(`Last updated ${new Date(updated[0].commit.author.date).toLocaleDateString("en-CA", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`)
            .setColor(0xFF69B4)
        return sent.edit("", embed);
    }
}