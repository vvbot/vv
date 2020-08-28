const { MessageEmbed } = require("discord.js");
const { join } = require("path");
const { readdirSync } = require("fs");

module.exports = {
    name: "debug",
    description: "VV's debug information.",
    async execute(message, args, client) {
        let allCommands = [];

        client.utils.getDirectories(join(__dirname, "..")).forEach(d => {
            let commands = readdirSync(join(__dirname, "..", d)).filter(file => file.endsWith(".js")).map(path => `${d}/${path}`);
            
            allCommands = allCommands.concat(...commands);
        });

        let availableCommands = allCommands.length - client.commands.size;
        
        const embed = new MessageEmbed()
            .setTitle("Debug VV:")
            .setColor("2f3136")
            .addField("Prefixes:", `${client.prefix}, ${message.guild.me}`)
            .addField("Physical:", `Uptime: ${client.utils.uptime().formatted}\nHeap Used: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100} MB\nHeap Total: ${Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100} MB`)
            .addField("Web:", "Inactive")
            .addField("Commands:", `Loaded: ${client.commands.size}\nAvailable: ${availableCommands}\nExecuted: ${client.commandsExecuted}\nMessages Seen: ${client.messagesSeen}\nMost Used: ${Object.keys(client.commandUsages).map(key => ({ key, uses: client.commandUsages[key] })).sort((f, s) => f.uses - s.uses)[0].key}`)
            .addField("Auto:", `Loaded: ${client.autoCommands.size}\nPatterns: ${client.autoPatterns.map(p => `\`${p}\``).join(", ")}`)
            .addField("Permissions:", `Add Reactions: ${message.guild.me.hasPermission("ADD_REACTIONS")}\nManage Messages: ${message.guild.me.hasPermission("MANAGE_MESSAGES")}\nRead Messages: ${message.guild.me.hasPermission("VIEW_CHANNEL")}\nRead Message History: ${message.guild.me.hasPermission("READ_MESSAGE_HISTORY")}\nSend Messages: ${message.guild.me.hasPermission("SEND_MESSAGES")}`)

        return message.channel.send(embed);
    }
};