const { Command } = require("discord-akairo");
const { list } = require("../../util/utils");

module.exports = class UnloadCommand extends Command {
    constructor() {
        super("unload", {
            aliases: ["unload", "ul"],
            description: "Unload a command from the bot process.",
            ownerOnly: true,
            typing: true,
            args: [
                {
                    id: "cmd",
                    prompt: {
                        star: "Please supply either a command to unload, or use the `a` or `all` arguments to unload all unnecessary commands."
                    },
                    type: "string"
                }
            ]
        })
    }

    exec(msg, { cmd }) {
        if (cmd == "a" || cmd == "all") {
            this.client.commandHandler.modules.forEach(c => {
                if(c.category == "developer") return;
                else return this.client.commandHandler.deregister(c);
            });
            return msg.util.send("Unloaded all commands.");
        } else if (/.*\/\*/.test(cmd) && (cmd != "a" || cmd != "all")) {
            let cat = cmd.split("/")[0];
            if(cat == "developer") return msg.util.send("That category cannot be unloaded.");

            let unregistered = [];

            this.client.commandHandler.modules.filter(c => c.category == cat).forEach(m => {
                unregistered.push(m.id);
                return this.client.commandHandler.deregister(m);
            });

            return msg.util.send(`Unloaded the ${list(unregistered, "`")} command${unregistered.length > 1 ? "s" : ""} from the \`${cat}\` filter.`)

        } else {
            let c = this.client.commandHandler.findCommand(cmd);

            if(!c) return msg.util.send("I couldn't find that command.");
            if(c.category == "developer") return msg.util.send("I can't unload that command.");

            this.client.commandHandler.deregister(c);
            return msg.util.send(`Unloaded the \`${c.id}\` ${(cmd != c.id) ? "(`" + cmd + "`) " : " "}command.`);
        }
    }
}