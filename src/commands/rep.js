module.exports = {
    name: "rep",
    description: "Bestow additional reputation upon someone",
    cooldown: 86400,
    async execute(message, args, client, logger) {
        const user = client.findMember(message, args[0], false);
        if(user.id === message.author.id) return message.channel.send("You cannot rep yourself...");
        client.sql.query(`SELECT * FROM users WHERE id = ${user.id}`, (error, rowsOriginal, fields) => {
            if(error) throw error;
            if (!rowsOriginal[0]) return message.channel.send(`That user has not set up an account. Get them to do it with **${client.prefix}open**!`)
            return client.sql.query(`UPDATE users SET rep = ${rowsOriginal[0].psiBoostsUsed !== 0 ? (rowsOriginal[0].rep + 1) * (rowsOriginal[0].psiBoostsUsed * 2) : rowsOriginal[0].rep + 1} WHERE id = ${user.id}`, (error, rows, fields) => {
                if(error) throw error;
                return message.channel.send(`Successfully gave **${user.displayName}** ${rowsOriginal[0].psiBoostsUsed !== 0 ? 1 * (rowsOriginal[0].psiBoostsUsed * 2) : 1} rep`)
            });
        });
    }
}
