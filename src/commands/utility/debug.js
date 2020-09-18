const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const ReactionMenu = require("@amanda/reactionmenu");

const { uptime } = require("../../util/utils");

module.exports = class DebugCommand extends Command {
    constructor() {
        super("debug", {
            aliases: ["debug"],
            description: "Debug information for VV",
            typing: true,
            args: [
                {
                    id: "a",
                    type: "string"
                },
                {
                    id: "b",
                    type: "string"
                }
            ]
        });
    }
    
    async exec(msg, args) {
        let menus = 0;
        
        ReactionMenu.menus.forEach(m => {
            menus++;
        });

        const embed = new MessageEmbed()
            .setTitle("Debug VV:")
            .setColor(this.client.color)
            .addField("Prefixes:", `${this.client.prefix}, ${msg.guild.me}`)
            .addField("Physical:", `Uptime: ${uptime().formatted}\nHeap Used: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100} MB\nHeap Total: ${Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100} MB`)
            .addField("Web:", "Unavailable")
            .addField("Commands:", `Modules loaded: ${this.client.commandHandler.modules.size}\nActive aliases: ${this.client.commandHandler.aliases.size}\nExecuted: ${this.client.commandsExecuted}\nMessages Seen: ${this.client.messagesSeen}\nActive ReactionMenus: ${menus}`)
            .addField("Permissions:", `Add Reactions: ${msg.guild.me.hasPermission("ADD_REACTIONS")}\nManage Messages: ${msg.guild.me.hasPermission("MANAGE_MESSAGES")}\nRead Messages: ${msg.guild.me.hasPermission("VIEW_CHANNEL")}\nRead Message History: ${msg.guild.me.hasPermission("READ_MESSAGE_HISTORY")}\nSend Messages: ${msg.guild.me.hasPermission("SEND_MESSAGES")}`)

        let nmsg = await msg.util.send(embed);

        const menu = new ReactionMenu(nmsg, [{ emoji: "🗑", allowedUsers: [msg.author.id], remove: "message" }]);
		return setTimeout(() => menu.destroy(true), 5 * 60 * 1000);
    }
}