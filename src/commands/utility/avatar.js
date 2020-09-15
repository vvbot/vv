const { Command } = require("discord-akairo");
const { findMember } = require("../../util/utils");
const { MessageEmbed } = require("discord.js");

module.exports = class AvatarCommand extends Command {
    constructor() {
        super("avatar", {
            aliases: ["avatar", "pfp"],
            description: "View the avatar of a user or yourself.",
            typing: true,
            args: [
                {
                    id: "user",
                    type: "string",
                    match: "content"
                }
            ]
        });
    }

    exec(msg, { user }) {
        let m = findMember(msg, user, true);
        let fill = "";

        if(user && m == msg.member) fill = "I couldn't find that user, so here's your avatar instead.";

        let embed = new MessageEmbed()
            .setImage(m.user.displayAvatarURL({ dynamic: true, size: 512}))
            .setColor(this.client.color);

        return msg.util.send(fill, embed);
    }
}