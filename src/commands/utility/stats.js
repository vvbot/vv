const { MessageEmbed } = require("discord.js");
const { Command } = require("discord-akairo");
const { uptime } = require("../../util/utils");

module.exports = class StatsCommand extends Command {
    constructor() {
        super("stats", {
            aliases: ["stats", "statistics"],
            description: "On the dot runtime statistics.",
            typing: true
        });
    }
    
    async exec(msg) {
        let sent = await msg.util.send("Crunching numbers...");

        const embed = new MessageEmbed()
            .addField("Bot Stats­", `Channels: **${this.client.channels.cache.size}**\nUsers: **${this.client.users.cache.size}**\nGuilds: **${this.client.guilds.cache.size}**\nCommands: **${this.client.commandHandler.modules.size}**`, true)
            .addField("\u200B", "\u200B", true) // For that glorious spacing.
            .addField("­", `Gateway: **${this.client.ws.ping.toFixed(2)}ms**\nMessage: **${sent.createdTimestamp - msg.createdTimestamp}ms**\nUptime: **${uptime().formatted}**\nRAM: **${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB**`, true)
            .setColor(this.client.color);

        return sent.edit("", embed);
    }
}