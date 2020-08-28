const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags")

module.exports = {
    name: "info",
    description: "ME.",
    aliases: ["about"],
    async execute(message, args, client) {
        const sent = await message.channel.send("\*dies\*");

        const embed = new MessageEmbed()
            .setTitle("VV's Information")
            .setDescription(stripIndents`
                I (${client.user.username}) was made by Axel ${client.utils.findMember(message, "gr3yroad", false) ? "(<@!" + client.utils.findMember(message, "gr3yroad", false) + ">)" : ""} in Node.JS using the Discord.JS Library.

                I'm in **${client.guilds.cache.size}** server${(client.guilds.cache.size > 1 ? "s" : "")}, with **${client.commands.size}** commands, and a total uptime of **${client.utils.uptime().humanized}**.\n`)
            .setColor(0xFF69B4);
        return sent.edit("", embed);
    }
}
