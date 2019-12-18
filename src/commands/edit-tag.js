module.exports = {
    name: "edit-tag",
    description: "Edits a user function (tag)",
    args: false,
    usage: "",
    hidden: true,
    
    execute(message, args, client, logger) {
        return message.channel.send("This feature is currently not supported. Look for it in a coming update!");
    }
}