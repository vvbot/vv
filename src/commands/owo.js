module.exports = {
    name: "owo",
    description: "Owoifys input",
    args: true,
    usage: "[TEXT]",
    async execute(message, args, client, logger) {
        let { owo } = await client.nekos.OwOify({ text: args.join(" ") });
        return message.channel.send(owo);
    }
}