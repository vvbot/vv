module.exports = {
    name: "disable",
    description: "__Globally__ disable the given command. If already disabled it will stay that way.",
    adminOnly: true,
    usage: "[COMMAND NAME]",
    cooldown: 5,
    execute(message, args, client, logger) {
        const commandName = args.join(" ");
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if(!command) return message.channel.send(`I was unable to find **${command.name}** in my commands.`);

        command.disabled = true;

        return message.channel.send(`Successfully disabled **${command.name}**.`);
    }
}