module.exports = {
    name: "tag",
    description: "View a user created function (tag)",
    //args: true,
    usage: "[TAG NAME]",
    cooldown: 5,
    execute(message, args, client, logger) {
        args = args.join(" ");
        client.sql.query(`SELECT * FROM tags WHERE tagName="${args.toUpperCase()}"`, (error, rows, fields) => {
            if(!rows[0]) {
                message.channel.send(`No such tag exists. You can create it with \`${client.prefix}create-tag ${args}\`, but for now I'll show a random tag:`);
                return client.sql.query(`SELECT * FROM tags`, (error, rows, fields) => {
                    return message.channel.send(client.randomItem(rows).tagContent);
                });
            } else {
                message.channel.send(rows[0].tagContent);
            }
        });
    }
}