const { MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
    name: "changelog",
    aliases: ["updates", "commits", "update"],
    description: "Responds with sh0dan's latest 10 commits.",
    async execute(message, args, client) {
        const { data: res } = await axios({
            url: "https://api.github.com/repos/axelgreavette/sh0dan/commits",
            headers: {
                "User-Agent": "sh0dan",
            }
        });

        const commits = res.slice(0, 10);

        const embed = new MessageEmbed()
            .setTitle("[sh0dan:master] Latest 10 commits")
            .setURL(client.github)
            .setDescription(
                commits.map(commit => {
                    const hash = `[\`${commit.sha.slice(0, 7)}\`](${commit.html_url})`;
                    return `${hash} ${client.shorten(commit.commit.message.split("\n")[0], 50)} - ${commit.author.login}`;
                }).join("\n")
            )
            .setColor(0xFF69B4);
            
        return message.channel.send(embed);
    }
}