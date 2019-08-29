module.exports = {
    name: "tag",
    description: "View a user created function (tag)",
    //args: true,
    usage: "[TAG NAME]",
    cooldown: 5,
    async execute(message, args, client, logger) {
        args = args.join(" ");
        const [rows] = await client.sql.execute("SELECT * FROM `tags` WHERE `tagName` = ?", [args.toUpperCase()]);
        if (!rows[0]) {
            message.channel.send(`No such tag exists. You can create it with \`${client.prefix}create-tag ${args}\`, but for now I'll show a random tag:`);
            const [rows] = await client.sql.query("SELECT * FROM `tags`");
            return message.channel.send(client.randomItem(rows).tagContent);
        } else {
            message.channel.send(rows[0].tagContent);
        }
    }
}