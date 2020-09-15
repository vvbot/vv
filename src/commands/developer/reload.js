const { Command } = require("discord-akairo");

module.exports = class ReloadCommand extends Command {
    constructor() {
        super("reload", {
            aliases: ["reload", "rl"],
            description: "Reload a command from within the bot process.",
            ownerOnly: true,
            typing: true,
            args: [
                {
                    id: "cmd",
                    prompt: {
                        start: "Please supply either a command to reload, or use the `a` or `all` arguments to reload all commands."
                    },
                    type: "string"
                }
            ]
        })
    }

    exec(msg, { cmd }) {
        if (cmd == "a" || cmd == "all") {
            this.client.commandHandler.reloadAll();
            return msg.util.send("Reloaded all commands.");
        } else {
            let c = this.client.commandHandler.findCommand(cmd);

            if(!c) return msg.util.send("I couldn't find that command.");

            this.client.commandHandler.reload(c.id);
            return msg.util.send(`Reloaded the \`${c}\` ${(cmd != c.id) ? "(`" + cmd + "`) " : ""}command.`);
        }
    }
}