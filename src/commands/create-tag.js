module.exports = {
    name: "create-tag",
    description: "Create a user function (tag)",
    args: true,
    usage: "\"[TAG NAME]\" \"[TAG CONTENT]\"",
    aliases: ["new-tag"],
    cooldown: 5,
    execute(message, args, client, logger) {
        args = args.join(" ").split('" "');
        client.sql.query(`INSERT INTO tags (tagName, tagContent, authorID) VALUES ("${args[0].replace(/"/g, "")}", "${args[1].replace(/"/g, "")}", ${message.author.id})`, (error, rows, fields) => {
            if(!error) return message.channel.send(`Success! View your tag with \`${client.prefix}tag ${args[0].replace(/"/g, "")}\``)
            else throw error;
        });
    }
}