const { join } = require("path");

module.exports = {
    name: "reload",
    description: "Reload a command within the bot process",
    args: true,
    aliases: ["rl"],
    adminOnly: true,
    execute(message, args, client) {
        if(!client.commands.get(args[0])) return message.channel.send(`That command couldn't be found within my processes. Try loading it with **${client.prefix}load ${args[0]}**`);
        delete require.cache[require.resolve(`./${args[0]}.js`)];
        client.commands.delete(args[0]);
        const cmd = require(join(client.commandsFolder, `${args[0]}.js`));
        client.commands.set(cmd.name, cmd);
        message.channel.send(`Successfully reloaded \`${args[0]}\`.`);
    }
}