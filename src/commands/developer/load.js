const { Command } = require("discord-akairo");
const { join } = require("path");
const { list } = require("../../util/utils");

module.exports = class LoadCommand extends Command {
    constructor() {
        super("load", {
            aliases: ["load", "l"],
            description: "Load a new command into the bot process.",
            ownerOnly: true,
            typing: true,
            args: [
                {
                    id: "cmd",
                    prompt: {
                        start: "Please supply either a command to load, or use the `a` or `all` arguments to load all unloaded commands."
                    },
                    type: "string"
                }
            ]
        });
    }

    exec(msg, { cmd }) {
        if(!/.*\/.*/.test(cmd) && (cmd != "a" || cmd != "all")) return msg.util.send(`That is not a valid command path. It should be formatted \`${this.client.prefix}load category/command\`.`)

        let [cat, c] = cmd.split("/");

        if (cmd == "a" || cmd == "all") {
            this.client.commandHandler.modules.forEach(c => {
                return this.client.commandHandler.deregister(c);
            });           
            this.client.commandHandler.loadAll();
            return msg.util.send("Loaded all unloaded commands.");
        } else if(c && c == "*") {
            let loaded = this.client.commandHandler.modules.filter(m => m.category == cat).map(m => m.id);
            this.client.commandHandler.modules.filter(m => m.category == cat).forEach(m => this.client.commandHandler.deregister(m));

            this.client.commandHandler.loadAll(join(__dirname, "..", cat));
            let newlyLoaded = this.client.commandHandler.modules.filter(m => m.category == cat && !loaded.includes(m.id)).map(m => m.id);

            let message = "Loaded ";
            if(newlyLoaded.length === 0) message += "no new commands.";
            if(newlyLoaded.length === 1) message += `the \`${newlyLoaded[0]}\` command from the \`${cat}\` directory.`;
            if(newlyLoaded.length > 1) {
                message += `the ${list(newlyLoaded, "`")} commands from the \`${cat}\` directory.`;
            }

            return msg.util.send(message);
        } else {
            try {
                let co = this.client.commandHandler.load(join(__dirname, "..", cat, `${c}.js`));

                if(!co) return msg.util.send("I couldn't find that command.");
                return msg.util.send(`Loaded the \`${co.id}\` command.`);
            } catch(e) {
                if(this.client.debug) this.client.logger.error(e);
                if(e) return msg.util.send(`I encountered the following error when trying to load the \`${cmd}\` command: \n\n\`\`\`${e}\`\`\``);
            }
        }
    }
}