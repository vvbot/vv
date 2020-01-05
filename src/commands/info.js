const RichEmbed = require("../struct/RichEmbed");
const { stripIndents } = require("common-tags")

module.exports = {
    name: "info",
    description: "Information regarding my process, and my guardian.",
    async execute(message, args, client, logger) {
        const sent = await message.channel.send("Purging the Crew...");

        const embed = new RichEmbed()
            .setTitle("Bot Information")
            .setDescription(stripIndents`
                **${client.user.username}** was made by [Axel Greavette](https://axelg.xyz) in Node.js using the Discord.js Library.
                She's currently serving **${client.guilds.size}** server${(client.guilds.size > 1 ? "s" : "")}, with **${client.commands.size}** commands, and a total uptime of **${client.uptime().humanized}**.\n`)
            .addField("Links", `Find sh0dan's support server [here](https://axelg.xyz/support-server).\nWant to donate? Make a donation through [Paypal](https://paypal.me/axelgreavette)!\nWant to contribute? Find her Github Repo [here](${client.github})!`)
            .setFooter("Destroy all humans!")
            .fix();
        return sent.edit(embed);
    }
}
