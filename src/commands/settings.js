const { RichEmbed } = require("discord.js");

const richer = require("../struct/RichEmbed")

module.exports = {
    name: "settings",
    description: "View your personal bot settings",
    args: true,
    usage: "[view/set] [?setting]",
    async execute(message, args, client, logger, Discord) {
        let mode = args[0].toLowerCase();
        let setting = args[1];

        let validSettings = [
            "prefix"
        ];

        if(mode != "view" && mode != "set") return message.reply("Please use either the `view` or `set` suffix with that command.");
        if(mode == "set" && setting && validSettings.includes(setting)) {
            try {
                await message.client.prefixes.personal.set(message.author.id, args[2]);
                message.channel.send(`Successfully set the *${setting}* setting for ${message.member.displayName}. View all your current settings with **${await message.client.prefixes.personal.get(message.author.id)}settings view** or **${message.client.prefixes.global}settings view**.`);
            } catch (err) {
                message.reply("The following error occurred during that operation:\n```js" + err + "```");
            }
        }
        if(mode == "view") {
            let setPrefix = await message.client.prefixes.personal.get(message.author.id);
            const embed = new richer()
                .setTitle(`Settings for ${message.member.displayName}`)
                .setDescription("*These are your user settings.*")
                .addField("Prefix:", setPrefix ? setPrefix : message.client.config.bot.prefix)
                .fix();
            message.channel.send(embed);
        }
    }
}