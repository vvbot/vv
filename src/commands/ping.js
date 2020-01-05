const RichEmbed = require("../struct/RichEmbed");
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
            .addField("axelg.xyz:", axelgxyz.avg ? `${axelgxyz.avg.toFixed(2)}ms` : "Unknown", true)
            .addField("axelgreavette.xyz", axelgreavettexyz.avg ? `${axelgreavettexyz.avg.toFixed(2)}ms` : "Unknown", true)
            .addField("shodanbot.com", shodanbot.avg ? `${shodanbot.avg.toFixed(2)}ms` : "Unknown", true)
            .addField("api.shodanbot.com", apishodanbot.avg ? `${apishodanbot.avg.toFixed(2)}ms` : "Unknown", true)
            .fix();
        return sent.edit(embed);
    }
}
