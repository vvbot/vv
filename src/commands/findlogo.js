module.exports = {
    name: "findlogo",
    description: "Returns the logo of the website / company provided",
    args: true,
    aliases: ["logo"],
    usage: "[WEBSITE OR COMPANY NAME]",
    cooldown: 5,
    async execute(message, args, client, logger) {
        const embed = client.defualtEmbed
            .setTitle("Your logo is served:")
            .setImage(`https://logo.clearbit.com/${args[0]}`)
        return message.channel.send(embed);
    }
}