module.exports = {
    name: "wide",
    description: "W i d e t e x t",
    args: true,
    usage: "[TEXT]",
    async execute(message, args, client, logger) {
        let text = args.join(" ");
        message.channel.send(client.shorten(client.utils.wide(text)));
    }
}