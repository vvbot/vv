const { join } = require("path");

module.exports = {
    name: "load",
    description: "Load a command into the bot process",
    args: true,
    usage: "",
    cooldown: 5,
    adminOnly: true,
    execute(message, args, client, logger) {
        let cmd;
        if(client.commands.get(args[0])) return message.channel.send("That command has already been loaded.");
        if(message.content.endsWith(".js")) cmd = require(join(client.commandsFolder, `${args[0]}`));
        else cmd = require(join(client.commandsFolder, `${args[0]}.js`));
        client.commands.set(cmd.name, cmd);
        message.channel.send(`Successfully loaded \`${args[0]}\``);
    }
}