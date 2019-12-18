const { RichEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
    name: "ping",
    description: "Ping pong ding dong",
    aliases: ["pong"],
    args: false,
    usage: "",
    guildOnly: false,
    async execute(message, args, client, logger) {
        const sent = await message.channel.send("Terraforming Mars...");
        const ping = decodeURIComponent(client.config.web["ping-api"]);

        const { data: axelgxyz } = await axios.get(`${ping}axelg.xyz`);
        const { data: axelgreavettexyz } = await axios.get(`${ping}axelgreavette.xyz`);
        const { data: shodanbot } = await axios.get (`${ping}shodanbot.com`);
        const { data: apishodanbot } = await axios.get (`${ping}api.shodanbot.com`);

        const embed = new RichEmbed()
            .setTitle("Pong!")
            .addField("Gateway:", client.ping.toFixed(2) + "ms", true)
            .addField("Message:", sent.createdTimestamp - message.createdTimestamp + "ms", true)
            .addField("axelg.xyz:", `${axelgxyz.avg.toFixed(2)}ms`, true)
            .addField("axelgreavette.xyz", `${axelgreavettexyz.avg.toFixed(2)}ms`, true)
            .addField("shodanbot.com", `${shodanbot.avg.toFixed(2)}ms`, true)
            .addField("api.shodanbot.com", `${apishodanbot.avg.toFixed(2)}ms`, true)
        client.fixEmbed(embed);
        return sent.edit(embed);
    }
}
