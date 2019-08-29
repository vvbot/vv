module.exports = {
    name: "create-tag",
    description: "Create a user function (tag)",
    args: true,
    usage: "\"[TAG NAME]\" \"[TAG CONTENT]\"",
    aliases: ["new-tag"],
    cooldown: 5,
    async execute(message, args, client, logger) {
        args = args.join(" ").split('" "');
        const [tags] = await client.sql.execute("SELECT * FROM `tags` WHERE tagName = ?", [args[0].replace(/"/g, "")]);
        if(tags[0]) return message.channel.send("A tag with that name already exists! Please try again using a different name.");
        const [result, error] = await client.sql.execute("INSERT INTO `tags` (tagName, tagContent, authorID) VALUES (?, ?, ?)", [args[0].replace(/"/g, ""), args[1].replace(/"/g, ""), message.author.id])
        if(!error) return message.channel.send(`Success! View your tag with \`${client.prefix}tag ${args[0].replace(/"/g, "")}\``)
        else throw error;
    }
}