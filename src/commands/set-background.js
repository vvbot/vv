module.exports = {
    name: "set-background",
    description: "Sets your profile background",
    aliases: ["set-bg"],
    args: true,
    usage: "[BACKGROUND]",
    async execute(message, args, client, logger) {
        const backgroundIndexes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        if(!backgroundIndexes.includes(Number(args[0]))) return message.channel.send("Please supply a valid background (One of " + backgroundIndexes.map(g => g + ", ") + ")");

        client.sql.query(`UPDATE users SET background = ${Number(args[0])} WHERE id = ${message.author.id}`, error => {
            if(error) throw error;
            return message.channel.send("Successfully set background");
        })
    }
}