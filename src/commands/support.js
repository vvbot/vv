module.exports = {
    name: "support",
    description: "Retrieves support protocols",
    args: false,
    usage: "[CODE]",
    cooldown: 5,
    execute(message, args, client, logger, Discord) {
        message.channel.send("Please join the support server at https://discordapp.com/invite/2ZR6yKr");
    }
}