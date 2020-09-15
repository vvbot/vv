const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

module.exports = class GuildInfoCommand extends Command {
    constructor() {
        super("guildinfo", {
            aliases: ["guildinfo"],
            description: "Fetches information about the current guild.",
            channel: "guild",
            typing: true
        });
    }

    exec(msg) {
        const embed = new MessageEmbed()
            .setTitle(`${msg.guild.name}`)
            .setThumbnail(msg.guild.iconURL())
            .addField("Member count:", msg.guild.memberCount, true)
            .addField("Boost count:", `${msg.guild.premiumSubscriptionCount} (tier ${msg.guild.premiumTier})`, true)
            .addField("Region:", msg.guild.region.charAt(0).toUpperCase() + msg.guild.region.slice(1), true)
            .addField("Owner:", `${msg.guild.owner} (${msg.guild.ownerID})`)
            .addField("Emojis:", msg.guild.emojis.cache.size <= 0 ? "This guild doesn't have any emojis." : msg.guild.emojis.cache.map(e => e.toString()).join(" "))
            .setFooter(`Guild ID: ${msg.guild.id}${msg.guild.partnered ? ". This guild is a Discord Partner." : ""}${msg.guild.verified ? ". This Guild is Verified." : ""}`)
            .setColor(this.client.color);
            
        return msg.util.send(embed);
    }
}