const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags")

module.exports = {
    name: "info",
    description: "Information regarding my process",
    usage: "",
    cooldown: 5,
    execute(message, args, client, logger) {
        const embed = new RichEmbed()
            .setTitle("Bot Information")
            .setDescription(stripIndents`
                **${client.user.username}** was made by [Axel Greavette](https://axelg.xyz) in Node.js using the Discord.js Library.
                
                She's currently serving
                **${client.guilds.size}** servers,
                with **${client.commands.size}** commands`)
        client.fixEmbed(embed);
        return message.channel.send(embed)
    }
}