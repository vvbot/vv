const { RichEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
    name: "stats",
    description: "On the dot statistics.",
    aliases: ["statistics"],
    async execute(message, args, client, logger) {
        const sent = await message.channel.send("Preforming Calculations...");
        const ping = client.config.web["ping-api"];

        const { data: axelgxyz } = await axios.get(`${ping}axelg.xyz`);
        const { data: axelgreavettexyz } = await axios.get(`${ping}axelgreavette.xyz`);
        const { data: shodanbot } = await axios.get (`${ping}shodanbot.com`);
        const { data: apishodanbot } = await axios.get (`${ping}api.shodanbot.com`);

        const { data: updated } = await axios({
            url: "https://api.github.com/repos/axelgreavette/sh0dan/commits",
            method: "get",
            headers: {
                "User-Agent": "sh0dan"
            }
        });

        const embed = new RichEmbed()
            .setTitle("Bot Statistics")
            .addField("­", `Channels: **${client.channels.size}**\nUsers: **${client.users.size}**\nGuilds: **${client.guilds.size}**\nCommands: **${client.commands.size}**\nUptime: **${client.uptime().formatted}**\nRAM Usage: **${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB**`, true)
            .addField("­", `Gateway: **${client.ping.toFixed(2)}**\nMessage: **${sent.createdTimestamp - message.createdTimestamp}ms**\naxelg.xyz: **${axelgxyz.avg.toFixed(2)}ms**\naxelgreavette.xyz: **${axelgreavettexyz.avg.toFixed(2)}ms**\nshodanbot.com: **${shodanbot.avg.toFixed(2)}**\napi.sh0danbot.com: **${apishodanbot.avg.toFixed(2)}ms**`, true)
            .setFooter(`Last updated ${new Date(updated[0].commit.author.date).toLocaleDateString("en-CA", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`)
        return sent.edit(embed);
    }
}