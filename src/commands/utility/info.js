const { Command } = require("discord-akairo");
const { uptime, findMember } = require("../../util/utils");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = class InfoCommand extends Command {
    constructor() {
        super("info", {
            aliases: ["info", "information"],
            description: "Information about me, myself and I.",
            typing: true
        });
    }

    async exec(msg) {
        let sent = await msg.util.send("\*dies\*");

        const embed = new MessageEmbed()
            .setTitle("I'm VV!")
            .setDescription(stripIndents`              
                I was made by Axel ${findMember(msg, this.client.ownerID[0], false) ? "(<@!" + findMember(msg, this.client.ownerID[0], false) + ">)" : ""} in Node.JS using the Discord.JS and Akairo libraries.

                I'm currently sitting in **${this.client.guilds.cache.size}** server${(this.client.guilds.cache.size > 1 ? "s" : "")}. I have **${this.client.commandHandler.modules.size}** active commands, and a total uptime of **${uptime().humanized}**.\n
            `)
            .setThumbnail(this.client.user.displayAvatarURL())
            .setFooter(`VV © 2020 Axel Greavette. You can view VV's privacy policy with ${this.client.prefix}privacy.`)
            .setColor(this.client.color);

        return sent.edit("", embed);
    }
}