module.exports = {
    name: "wide",
    description: "W i d e t e x t",
    args: true,
    usage: "[TEXT]",
    cooldown: 5,
    async execute(message, args, client, logger) {
        let text = args.join(" ");
        message.channel.send(client.utils.wide(text));
    }
}