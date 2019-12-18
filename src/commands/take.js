module.exports = {
    name: "take",
    description: "Take someones nanites",
    adminOnly: true,
    args: true,
    async execute(message, args, client, logger) {
        const user = client.findMember(message, args[1], true);
        client.sql.query(`UPDATE users SET nanites = (SELECT nanites WHERE id = ${user.id}) - ${Number(args[0])} WHERE id = ${user.id}`, error => {
            if (error) return error;
            return message.channel.send("Successfully took " + args[0] + client.emojiUtils.emojis.nanites + " from " + user.displayName);
        });
    }
}
