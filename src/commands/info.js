const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags")
const axios = require("axios");
const moment = require("moment");

module.exports = {
    name: "info",
    description: "Information regarding my process",
    usage: "",
    aliases: ["stats"],
    cooldown: 5,
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
            .setTitle("Bot Information")
            .setDescription(stripIndents`
                **${client.user.username}** was made by [Axel Greavette](https://axelg.xyz) in Node.js using the Discord.js Library.
                She's currently serving **${client.guilds.size}** servers, with **${client.commands.size}** commands, with an uptime of **${client.uptime()}**.\n`)
            .addField("Gateway:", client.ping.toFixed(2) + "ms", true)
            .addField("Message:", sent.createdTimestamp - message.createdTimestamp + "ms", true)
            .addField("axelg.xyz:", `${axelgxyz.avg.toFixed(2)}ms`, true)
            .addField("axelgreavette.xyz", `${axelgreavettexyz.avg.toFixed(2)}ms`, true)
            .addField("shodanbot.com", `${shodanbot.avg.toFixed(2)}ms`, true)
            .addField("api.shodanbot.com", `${apishodanbot.avg.toFixed(2)}ms`, true)
            .setFooter(`Last updated ${new Date(updated[0].commit.author.date).toLocaleDateString("en-CA", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`)

        client.fixEmbed(embed);
        return sent.edit(embed)
    }
}