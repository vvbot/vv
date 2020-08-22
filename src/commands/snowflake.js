module.exports = {
    name: "snowflake",
    description: "Returns the timestamp of the given snowflake",
    args: false,
    usage: "[SNOWFLAKE]",
    guildOnly: false,
    execute(message, args, client) {
        message.channel.send(new Date((args[0] * Math.pow(2, -22)) + 1420070400000).toUTCString())
    }
}