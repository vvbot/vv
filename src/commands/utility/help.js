const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "help",
    description: "Lists all of my commands or information related to a singularity",
    usage: "<?command|category|args>",
    aliases: ["h"],
    credits: [
        {
            name: "Async",
            for: "Inspiration"
        }
    ],
    execute(message, args, client) {
        if(!args.length) {
            const embed = new MessageEmbed()
                .setTitle("Command Categories:")
                .setColor(0xFF69B4)
                .setDescription(client.categories.filter(c => c != "disabled" && c != "developer").map(c => `≫ ${client.utils.capitalize(c.toLowerCase())}`).concat(["≫ All"]).sort().join("\n"))
                .setFooter(`Use ${client.prefix}help <command> to see more information about a category, and the commands that fall into it.`);

            return message.channel.send(embed);
        }

        const name = args[0].toLowerCase();
        let result;

        if(!client.categories.includes(args[0].toLowerCase()) && client.commands.get(name) || !client.categories.includes(args[0].toLowerCase()) && client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(name))) {
            result = client.commands.get(name) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(name));

            let description = `Name: ${result.name}\nCategory: ${client.utils.capitalize(result.category)}`;

            if (result.aliases) description += `\nAliases: ${result.aliases.join(", ")}`;
            if (result.description) description += `\nDescription: ${result.description}`;
            if (result.usage) description += `\nUsage: ${client.prefix}${result.name} ${result.usage}`;

            description += `\nCooldown: ${result.cooldown || 3} second(s)`;

            const embed = new MessageEmbed()
                .setDescription(description)
                .setColor(0xFF69B4);

            return message.channel.send(embed);
        } else if(client.categories.includes(args[0].toLowerCase())) {

            let cmds = client.commands.filter(c => {
                if(c.category == args[0] && (!c.disabled || !c.hidden)) return true;
                else if (c.category == args[0] && (c.adminOnly && !client.isOwner(message.author))) return true;
                else return false;
            }).map(c => {
                if(c.allCaps === true) return c.name.toUpperCase();
                else return c.name;
            });

            const embed = new MessageEmbed()
                .setDescription(`${client.catDescs[args[0].toLowerCase()]}`)
                .addField("Available Commands:", cmds.join(", ") || "There are either no commands that fit this category at the moment or you're not authorized to use or view them.")
                .setColor(0xFF69B4)
                .setFooter(`Use ${client.prefix}help <command> to see more information about a command.`);

            return message.channel.send(embed);
        } else if (args[0] == "all" || args[0] == "a") {         
            const embed = new MessageEmbed()
                .setTitle("Listing all available commands:")
                .setColor(0xFF69B4)
                .setDescription(`${client.commands.filter(cmd => {
                    if(cmd.adminOnly || cmd.disabled || cmd.hidden) return false;
                    else return true;
                }).map(c => c.name).join(", ")}\n\nUse \`${client.prefix}help <category>\` to see more information about a specific category.\nUse \`${client.prefix}help <command>\` to see more information about a specific command.`);
            
            return message.channel.send(embed);
        } else if (args[0] == "args" || args[0] == "arguments") {
            const embed = new MessageEmbed()
                .setTitle("Help with arguments:")
                .setColor(0xFF69B4)
                .setDescription(`Some of VV's commands use these things called arguments. Arguments are the words or symbols that come after a command, and are sometimes used to provide extra options for commands, or user input.\n\nIn the help panel, a command's arguments are explained in the **Usage** section. Usually it looks something like this: \n\nUsage: ${client.prefix}xkcd <?issue>\n\nThe argument for this command is \`issue\`. We know this because it's surrounded by \`< >\`. Notice how it's prefixed with a \`?\`. This means that it's optional. In the case of the \`${client.prefix}discriminator\` command, if the arguments aren't supplied VV defaults to using the author's discriminator. \n\nThat's it! You now know everything there is to know about VV's command arguments! Have fun!`);
        
            return message.channel.send(embed);
        } else {
            return message.channel.send(`I couldn't find the **${name}** command.`);
        }
    }
};