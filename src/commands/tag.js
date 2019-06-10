module.exports = {
    name: "tag",
    description: "View a user created function (tag)",
    args: true,
    usage: "[TAG NAME]",
    cooldown: 5,
    execute(message, args, client, logger) {
        args = args.join(" ");
        client.sql.query(`SELECT * FROM tags WHERE tagName="${args.toUpperCase()}"`, (error, rows, fields) => {
            if(!rows[0]) return message.channel.send(`No such tag exists. Create it with \`${client.prefix}create-tag ${args}\``);
            message.channel.send(rows[0].tagContent);
        });
    }
}