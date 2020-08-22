const axios = require("axios");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "insult",
    description: "Insults someone",
    args: true,
    usage: "[USER]",
    guildOnly: false,
    async execute(message, args, client) {
        const insultee = client.findMember(message, args[0], false);
        const result = await axios.get("https://insult.mattbas.org/api/insult.json")
        const embed = new MessageEmbed()
            .setTitle("It\'s getting rough in here!")
            .setDescription(`${insultee.displayName}, ${result.data.insult.charAt(0).toLowerCase() + result.data.insult.slice(1)}`)
            .fix(embed);
        message.channel.send(embed);
    }
}