const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

module.exports = class InviteCommand extends Command {
    constructor() {
        super("invite", {
            aliases: ["invite"],
            description: "Returns urls for you to invite me with, read my docs, and join my support server.",
            typing: true
        });
    }
    
    exec(msg) {
        const embed = new MessageEmbed()
            .setDescription(`From here you can\n  •  invite me to your server [here](${this.client.urls.me})\n  •  join my support server [here](${this.client.urls.server})\n  •  read my docs [here](${this.client.urls.info})`)
            .setColor(this.client.color)

        msg.util.send(embed);
    }
}