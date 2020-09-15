const { MessageEmbed } = require("discord.js");
const { Command } = require("discord-akairo");

const cats = require("../../util/categories");
const { capitalize } = require("../../util/utils");

module.exports = class HelpCommand extends Command {
    constructor() {
        super("help", {
            aliases: ["help", "h"],
            description: "Lists all of my commands and the information you need to use them.",
            typing: true,
            args: [
                {
                    id: "cmd",
                    type: "string"
                }
            ],
            credits: [
                {
                    name: "Async",
                    for: "Inspiration"
                }  
            ]
        });
    }

    exec(msg, args) {
        if(!args.cmd) {
            const embed = new MessageEmbed()
                .setTitle("Command Categories:")
                .setColor(this.client.color)
                .setDescription(this.client.commandHandler.categories.filter(c => !["disabled", "developer"].includes(c)).map(c => `≫ ${capitalize(c.id.toLowerCase())}`).concat(["≫ All"]).sort().join("\n"))
                .setFooter(`You can use ${this.client.prefix}help <query> to see more information about a category or command.`)

            return msg.util.send(embed);
        }

        let { cmd } = args;
        let result;

        if(!this.client.commandHandler.findCategory(cmd) && this.client.commandHandler.findCommand(cmd)) {
            result = this.client.commandHandler.findCommand(cmd);

            let description = `**Aliases**: ${result.aliases.join(", ")}\n**Category**: ${capitalize(result.categoryID)}`;

            if (result.description) description += `\n**Description**: ${result.description}`;
            if (result.usage) description += `\n**Usage**: ${client.prefix}${result.name} ${result.usage}`;

            description += `\n**Cooldown**: ${result.cooldown || 3} second(s)`;

            const embed = new MessageEmbed()
                .setColor(this.client.color)
                .setDescription(description)

            return msg.util.send(embed);
        } else if(this.client.commandHandler.findCategory(cmd) && !this.client.commandHandler.findCommand(cmd)) {
            let cmds = this.client.commandHandler.findCategory(cmd).filter(c => {
                if ((!c.disabled || !c.hidden) && !this.client.isOwner(msg.author)) return true;
                else return false;
            });

            const embed = new MessageEmbed()
                .setDescription(`${cats[cmd.toLowerCase()]}`)
                .addField("Available Commands:", cmds.keyArray().join(", ") || "There are either no commands that fit this category at the moment, or you're not authorized to use or view them.")
                .setColor(this.client.color)
                .setFooter(`Use ${this.client.prefix}help <command> to see more information about a command.`);

            return msg.util.send(embed);
        } else if (cmd == "all" || cmd == "a") {
            const embed = new MessageEmbed()
                .setTitle("Listing all available commands:")
                .setColor(0xFF69B4)
                .setDescription(`${this.client.commandHandler.modules.filter(c => {
                    if ((!c.disabled || !c.hidden) && !this.client.isOwner(msg.author)) return true;
                    else return true;
                }).keyArray().join(", ")}\n\nUse \`${this.client.prefix}help <category>\` to see more information about a specific category.\nUse \`${this.client.prefix}help <command>\` to see more information about a specific command.\nIse \`${this.client.prefix}help arguments\`to see more information about command arguments.`);

            return msg.util.send(embed);
        } else if (cmd == "args" || cmd == "arguments") {
            const embed = new MessageEmbed()
                .setTitle("Help with arguments:")
                .setColor(0xFF69B4)
                .setDescription(`Some of VV's commands use these things called arguments. Arguments are the words or symbols that come after a command, and are sometimes used to provide extra options for commands, or user input.\n\nIn the help panel, a command's arguments are explained in the **Usage** section. Usually it looks something like this: \n\nUsage: ${this.client.prefix}xkcd [issue]\n\nThe argument for this command is \`issue\`. We know this because it's surrounded by brackets. But notice how those brackets are square and aren't pointy? That means it's optional. In the case of the \`${this.client.prefix}discriminator\` command, if the arguments aren't supplied VV defaults to using the author's discriminator. \n\nThat's it! You now know everything there is to know about VV's command arguments! Have fun!`);

            return msg.util.send(embed);
        }
    }
}