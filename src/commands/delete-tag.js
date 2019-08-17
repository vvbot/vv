module.exports = {
    name: "delete-tag",
    description: "Create a user function (tag)",
    args: true,
    usage: "\"[TAG NAME]\"",
    aliases: ["remove-tag"],
    cooldown: 5,
    execute(message, args, client, logger) {
        args = args.join(" ").split('" "');
        client.sql.query(`SELECT * FROM tags WHERE tagName = "${args[0].replace(/"/g, "")}"`, (error, rows, fields) => {
            if(!message.author.id == rows[0].authorID && !client.config.bot.admins.includes(message.author.id)) return message.channel.send("You do not have the permissions required to delete that tag.");
            else client.sql.query(`DELETE FROM tags WHERE tagName = "${args[0].replace(/"/g, "")}"`, (error, rows, fields) => {
                message.channel.send("👌")
            })
        });
    }
}