module.exports = {
    name: "unload",
    description: "Unload a file within the bot process",
    args: false,
    usage: "[COMMAND TO UNLOAD]",
    adminOnly: true,
    execute(message, args, client, logger) {
        if(!client.commands.get(args[0])) return message.channel.send(`No command was found for that query: \`${args[0]}\``);
        delete require.cache[require.resolve(`./${args[0]}.js`)];
        client.commands.delete(args[0]);
        message.channel.send(`Successfully unloaded \`${args[0]}\``);
    }
}