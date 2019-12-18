module.exports = {
    name: "open",
    description: "Initializes a new account containing Nanites and other goodies",
    aliases: ["open-account", "setup", "initial"],
    async execute(message, args, client, logger) {   
        client.sql.query(`SELECT * FROM users WHERE id = ${message.author.id}`, (error, rows, fields) => {
            if(error) throw error;
            if(!rows[0]) {
                client.sql.query(`INSERT INTO users (id, nanites, opened, psiBoostsUsed, brawnBoostsUsed, rep, background, badges) VALUES (${message.author.id}, 5000, 1, 0, 0, 0, 1, "['none']")`, (error, rows, fields) => {
                    if(error) throw error;
                    return message.channel.send(`Successfully opened an account and credited it with **5000** ${client.emojiUtils.emojis.nanites}`);
                });
            } else if (rows[0] && rows[0].opened === 1) {
                return message.channel.send("Your account has already been opened and credited.");
            } else if (rows[0] && !rows[0].opened || rows[0] && rows[0].opened === 0) {
                client.sql.query(`UPDATE users SET nanites = (SELECT nanites WHERE id = ${message.author.id}) + 5000 WHERE id = ${message.author.id}`, (error, rows, fields) => {
                    if(error) throw error;
                    else return message.channel.send(`Your account has been set up and credited with **5000** ${client.emojiUtils.emojis.nanites}`);
                });
            }
        });  
    }
}
