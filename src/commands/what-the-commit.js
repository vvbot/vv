const { get } = require("axios");

module.exports = {
    name: "what-the-commit",
    aliases: ["wtc", "what-commit"],
    description: "Commit messages as a service",
    cooldown: 5,
    async execute(message, args, client, logger) {
        const { data } = await get("http://whatthecommit.com/index.txt");
        message.channel.send(data);
    }
}