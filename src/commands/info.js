const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags")

module.exports = {
    name: "info",
    description: "Information regarding my process, and my guardian.",
    cooldown: 5,
    async execute(message, args, client, logger) {
        const sent = await message.channel.send("Purging the Crew...");

        const embed = new RichEmbed()
            .setTitle("Bot Information")
            .setDescription(stripIndents`
                **${client.user.username}** was made by [Axel Greavette](https://axelg.xyz) in Node.js using the Discord.js Library.
                She's currently serving **${client.guilds.size}** server${(client.guilds.size > 1 ? "s" : "")}, with **${client.commands.size}** commands, and a total uptime of **${client.uptime()}**.\n`)
            .addField("Links", `Find sh0dan's website [here](https://shodanbot.com), and her support server [here](https://axelg.xyz/support-server).\nWanna vote for her? Do it [here](https://bots.ondiscord.xyz/bots/378909180666314754) on bots.ondiscord.xyz!\nWanna donate? Make a donation through [Paypal](https://paypal.me/axelgreavette)!\nWanna contribute? Find her Github Repo [here](${client.github})!`)
            .setFooter("Destroy all humans!")
            client.fixEmbed(embed);
        return sent.edit(embed);
    }
}
