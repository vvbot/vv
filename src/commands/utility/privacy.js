const { Command } = require("discord-akairo");
const { stripIndents } = require("common-tags");
const { MessageEmbed } = require("discord.js");

module.exports = class PrivacyCommand extends Command {
    constructor() {
        super("privacy", {
            aliases: ["privacy", "privacy-policy", "p", "pp"],
            description: "Shows VV's extremely in-depth and complicated (/s) privacy policy.",
            typing: true
        });
    }

    exec(msg) {
        const embed = new MessageEmbed()
            .setTitle("VV's Privacy Policy")
            .setDescription(stripIndents`Lets get this straight right off the bat: **VV stores literally none of your information**. **At all**.
                                        
                                        In fact, VV doesn't even *log* any of your information. Really, to be honest, even in development environments VV logs so little runtime information that it's hard to find errors.
                                                                                
                                        So to recap, **VV doesn't store or log jack about you**. `)
            .setColor(this.client.color)
            .setFooter("Last updated 9/17/2020")
        
        return msg.util.send(embed);
    }
}