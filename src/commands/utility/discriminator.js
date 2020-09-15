const { Command } = require("discord-akairo");
const { trimArray } = require("../../util/utils");
const { stripIndents } = require("common-tags");

module.exports = class DiscriminatorCommand extends Command {
    constructor() {
        super("discriminator", {
            aliases: ["discriminator", "discrim", "search-discrim", "search-discriminator"],
            description: "Searches the current guild for users with the given discriminator.",
            typing: true,
            args: [
                {
                    id: "discrim",
                    type: "string",
                    match: "content",
                    default: msg => msg.author.discriminator
                }
            ]
        });
    }
    exec(msg, { discrim }) {
        if (!/^[0-9]+$/.test(discrim) && !discrim.length === 4) {
            return msg.util.send("An invalid discriminator was given.");
        }

        let users = msg.guild.members.cache.filter(member => member.user.discriminator === discrim).map(user => "  •  " + user.user.username + "#" + user.user.discriminator + " (" + user.id + ")")
        return msg.util.send(`I found **${users.length}** ${(users.length === 1) ? "user"  : "users"} with the discriminator **#${discrim}**: \n${trimArray(users, 50).join("\n")}
		`)
    }
}