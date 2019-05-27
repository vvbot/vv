module.exports = {
    name: "webhook",
    description: "Sends a message through one of my sub routines",
    args: true,
    usage: "[MESSAGE]",
    cooldown: 5,
    adminOnly: true,
    async execute(message, args, client, logger) {        
        args = args.join(" ");

        client.webhooks.AGC.send(args);
    }
}