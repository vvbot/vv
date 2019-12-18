module.exports = {
    name: "delete-tag",
    description: "Create a user function (tag)",
    args: true,
    usage: "\"[TAG NAME]\"",
    aliases: ["remove-tag"],
    
    async execute(message, args, client, logger) {
        args = args.join(" ").split('" "');
        const [rows, error] = await client.sql.execute("SELECT authorID FROM `tags` WHERE `tagName` = ?", [args[0].replace(/"/g, "")]);
        if(!message.author.id == rows[0] && !client.config.bot.admins.includes(message.author.id)) {
            return message.channel.send("You do not have the permissions required to delete that tag.");
        } else {
            await client.sql.execute("DELETE FROM `tags` WHERE `tagName` = ?", [args[0].replace(/"/g, "")]);
            message.channel.send("👌");
        }
    }
}