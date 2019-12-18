module.exports = {
    name: "shady",
    description: "ShadY TExt",
    args: true,
    usage: "[TEXT]",
    async execute(message, args, client, logger) {
        let text = args.join(" ");
        //(args.length !== 0) ? text = args.join(" ") : text =  await message.channel.fetchMessages({ limit: 3 }).filter(msg => message.author.id === msg.author.id).array().map(msg =>  msg.content )[2];
        message.channel.send(client.utils.randCap(text));
    }
}