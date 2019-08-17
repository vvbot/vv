module.exports = {
    name: "vote",
    description: "Vote for me on Bots On Discord!",
    cooldown: 5,
    execute(message, args, client, logger) {
        message.channel.send("Hey! Please vote for me on [bots.ondiscord.xyz](https://bots.ondiscord.xyz/bots/378909180666314754) <3!")
    }
}