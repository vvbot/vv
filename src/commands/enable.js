module.exports = {
    name: "enable",
    description: "__Globally__ enable the given command. If already enabled it will stay that way.",
    adminOnly: true,
    usage: "<command name>",
    execute(message, args, client) {
        const commandName = args.join(" ");
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if(!command) return message.channel.send(`I was unable to find **${command.name}** in my commands.`);

        command.disabled = false;

        return message.channel.send(`Successfully enabled **${command.name}**.`);
    }
}