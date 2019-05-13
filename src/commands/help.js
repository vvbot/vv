const { BOT_PREFIX } = process.env;

module.exports = {
    name: "help",
    description: "Lists all of my commands or information related to a singularity",
    args: false,
    usage: "[COMMAND NAME (Optional)]",
    guildOnly: false,
    execute(message, args, client, logger) {
        const body = [];
        const { commands } = message.client;

        if(!args.length) {
            body.push("Here is a list of all my functions:\n");
            body.push(commands.filter(command => {
                if (command.hidden && command.hidden === true || command.disabled && command.disabled === true) return false;
                return true
            }).map(command => `**${command.name}**: ${command.description}`).join("\n"));
            body.push(`\nYou can utilise \`${BOT_PREFIX}help [COMMAND NAME]\` for further information`);

            return message.author.send(body, { split: true}).then(() => {
                if (message.channel.type === "dm") return;
                message.channel.send("I've sent you a DM containing information regarding my functions");
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
        if (command.usage) body.push(`**Usage:** ${BOT_PREFIX}${command.name} ${command.usage}`);
        
        body.push(`**Cooldown**: ${command.cooldown || 3} second(s)`);

        message.channel.send(body, { split: true });
    }
}