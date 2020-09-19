const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const axios = require("axios");

const { shorten } = require("../../util/utils");

module.exports = class ChangelogCommand extends Command {
    constructor() {
        super("changelog", {
            aliases: ["changelog", "updates", "commits", "cl", "changes"],
            description: "Returns VV's ten most recent commits and changes.",
            typing: true
        });
    }

    async exec(msg) {
        let { data: res } = await axios({
            url: "https://api.github.com/repos/vvbot/vv/commits",
            headers: {
                "User-Agent": "VV",
            }
        });

        let commits = res.slice(0, 10);

        const embed = new MessageEmbed()
            .setTitle("[vv:master] Newest Commits")
            .setURL(this.client.urls.github)
            .setDescription(
                commits.map(commit => {
                    const hash = `[\`${commit.sha.slice(0, 7)}\`](${commit.html_url})`;
                    return `${hash} - ${commit.author.login} - ${shorten(commit.commit.message.split("\n")[0], 50)}`;
                }).join("\n")
            )
            .setFooter(`Code last updated ${new Date(commits[0].commit.author.date).toLocaleDateString("en-CA", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}`)
            .setColor(this.client.color);

        return msg.util.send(embed);
    }
}