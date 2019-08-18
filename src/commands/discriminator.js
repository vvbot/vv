const { stripIndents } = require("common-tags");

module.exports = {
    name: "discriminator",
    aliases: ["discrim", "search-discrim", "search-discriminator"],
    description: "Searches for other users with your desired descriminator",
    async execute(message, args, client, logger, Discord) {
        const discrim = args.length !== 0 ? args.join(" ") : message.author.discriminator;
        
        if (!/^[0-9]+$/.test(discrim) && !discrim.length === 4) {
            return message.channel.send("Discriminator was invalid.");
        }
        
        const users = client.users.filter(user => user.discriminator === discrim).map(user => user.username + " (" + user.id + ")")
        return message.channel.send(stripIndents `
			I found **${users.length}** ${(users.length === 1) ? "user"  : "users"} with the discriminator **#${discrim}**:
			${client.utils.trimArray(users, 50).join(", ")}
		`)
    }
}