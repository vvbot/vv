const { RichEmbed } = require("discord.js");

module.exports = {
    name: "help",
    description: "Lists all of my commands or information related to a singularity",
    args: false,
    usage: "[COMMAND NAME (Optional)]",
    guildOnly: false,
    execute(message, args, client, logger) {
        const body = [];
        const { commands } = message.client;

        const embed = new RichEmbed()
            .setTitle("Help has been sent to your DMs via a Cortex Reaver")
            .setThumbnail("https://vignette.wikia.nocookie.net/shodan/images/d/da/CortexReaver_Icon.png/revision/latest?cb=20160718025241")
        client.fixEmbed(embed);
        
        if(!args.length) {
            body.push("Here is a list of all my functions:\n");
            body.push(commands.filter(command => {
                if (command.hidden|| command.disabled || command.adminOnly) return false;
                return true
            }).map(command => `**${command.name}** :: ${command.description}`).join("\n"));
            body.push(`\nYou can utilise **${client.prefix}help [COMMAND NAME]** or **${client.user}help [COMMAND NAME]** for further information`);

            return message.author.send(body, { split: true}).then(() => {
                if (message.channel.type === "dm") return;
                message.channel.send(embed);
            }).catch(e => {
                console.error(`Was unable to send \`HELP DM\` to ${message.author.tag}.\n`, e);
                message.reply("I was unable to DM you. Please check you have DMs enabled.");
            })
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name || commands.find(cmd => cmd.aliases && cmd.aliases.includes(name)));

        if(!command) return message.channel.send(`404 requested function (**${name}**) was not found.`);

        body.push(`**Name:** ${command.name}`);

        if (command.aliases) body.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) body.push(`**Description:** ${command.description}`);
        if (command.usage) body.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
        
        body.push(`**Cooldown**: ${command.cooldown || 3} second(s)`);

        message.channel.send(body, { split: true });
    }
}