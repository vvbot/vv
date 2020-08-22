module.exports = {
    name: "webhook",
    description: "Sends a message through one of MY bots",
    args: true,
    usage: "<message>",
    aliases: ["hook"],
    adminOnly: true,
    async execute(message, args, client) {        
        args = args.join(" ");

        client.webhooks.N.send(args);
    }
}