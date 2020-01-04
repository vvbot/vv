module.exports = {
    name: "daily",
    description: "Bestow daily coins upon you or someone else",
    cooldown: 86400,
    async execute(message, args, client, logger) {
        const user = client.findMember(message, args[0], true);
        const ammount = (args[0] ? 500 + Math.floor((Math.random() * 300) + 1) : 500)
        client.sql.query(`SELECT * FROM users WHERE id = ${user.id}`, (error, rowsOriginal, fields) => {
            if(error) throw error;
            if (!rowsOriginal[0]) return message.channel.send(`That user has not set up an account. Get them to do it with **${client.prefix}open**!`)
            return client.sql.query(`UPDATE users SET nanites = ${rowsOriginal[0].brawnBoostsUsed !== 0 ? rowsOriginal[0].nanites + (ammount * (rowsOriginal[0].brawnBoostsUsed * 2)) : rowsOriginal[0].nanites + ammount} WHERE id = ${args[0] ? user.id : message.author.id}`, (error, rows, fields) => {
                if(error) throw error;
                return message.channel.send(`Successfully ${args[0] ? "gave" : "redeemed"} ${rowsOriginal[0].brawnBoostsUsed !== 0 ? (ammount * (rowsOriginal[0].brawnBoostsUsed * 2)) : ammount} ${client.emojiUtils.emojis.nanites}${args[0] ? " to **" + user.displayName + "**": ""}`)
            });
        });
    }
}
