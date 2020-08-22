module.exports = {
    name: "owo",
    description: "Owoifys input",
    args: true,
    usage: "[TEXT]",
    async execute(message, args, client) {
        let { owo } = await client.goodNekos.OwOify({ text: args.join(" ") });
        return message.channel.send(owo);
    }
}
