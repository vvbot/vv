const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "help",
    description: "Info about commands I have. It's like a book, but better?",
    args: false,
    usage: "<?command name>",
    guildOnly: false,
    execute(message, args, client) {
        const body = [];
        const { commands } = message.client;

        if(!args.length) {
            body.push("Here is a list of all my functions:\n");
            body.push(commands.filter(command => {
                if (command.hidden|| command.disabled || command.adminOnly) return false;
                return true
            }).map(command => `**${command.name}** :: ${command.description}`).join("\n"));
            body.push(`\nYou can use **${client.prefix}help <command name>** or **${client.user}help <command name>** for further information`);

            return message.author.send(body, { split: true}).then(() => {
                if (message.channel.type === "dm") return;
                message.channel.send("I sent you a DM.");
            }).catch(e => {
                console.error(`Was unable to send \`HELP DM\` to ${message.author.tag}.\n`, e);
                message.reply("I couldn't DM you. Make sure you have your DMs open.");
            })
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name || commands.find(cmd => cmd.aliases && cmd.aliases.includes(name)));

        if(!command) return message.channel.send(`I couldn't find this "${name}" command. Try again maybe?`);

        body.push(`**Name:** ${command.name}`);

        if (command.aliases) body.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) body.push(`**Description:** ${command.description}`);
        if (command.usage) body.push(`**Usage:** ${client.prefix}${command.name} ${command.usage}`);
        
        body.push(`**Cooldown**: ${command.cooldown || 3} second(s)`);

        message.channel.send(body, { split: true });
    }
}