module.exports = {
    name: "id",
    description: "Finds the id of the mentioned user, yourself, or the linked channel",
    args: false,
    usage: "[-C|-S|-G] [MENTION (OPTIONAL)]",
    execute(message, args, client) {
        if(!args.length) return message.channel.send("Please use either the \`-C\` or \`-S\` flags to find the ID of the current Channel, a User (either you or a mention) or the Guild respectively.")
        if (args[0].toLowerCase() === "-c") return message.channel.send(message.channel.id)
        else if (args[0].toLowerCase() === "-s") return message.channel.send(client.findMember(message, args[1], true).id)
        else if (args[0].toLowerCase() === "-g") return message.channel.send(message.guild.id)
    }
}