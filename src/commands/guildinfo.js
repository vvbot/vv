const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "guildinfo",
    description: "Retrieves information about the current guild",
    args: false,
    usage: "",
    guildOnly: true,
    execute(message, args, client) {
        const embed = new MessageEmbed()
            .setTitle(`Information for ${message.guild.name}`)
            .setThumbnail(message.guild.iconURL)
            .addField("ID:", message.guild.id, true)
            .addField("Size:", message.guild.memberCount, true)
            .addField("Region:", message.guild.region.charAt(0).toUpperCase() + message.guild.region.slice(1), true)
            .addField("Owner:", `${message.guild.owner} (${message.guild.ownerID})`, true)
            .setColor(0xFF69B4);
            
        return message.channel.send(embed);
    }
}