module.exports = {
    name: "catus",
    description: "Returns cat version of the HTTP error provided",
    args: true,
    aliases: ["cat-error"],
    usage: "[HTTP ERROR CODE]",
    cooldown: 5,
    async execute(message, args, client, logger) {
        const embed = client.defualtEmbed
            .setTitle("Your logo is served:")
            .setImage(`https://http.cat/${args[0]}`)
        return message.channel.send(embed);
    }
}