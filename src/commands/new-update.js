module.exports = {
    name: "new-update",
    description: "Creates a new update tile for my online interface.",
    args: true,
    usage: "[TITLE] [DESCRIPTION]",
    cooldown: 5,
    adminOnly: true,
    async execute(message, args, client, logger) {        
        client.sql.query(`INSERT INTO updates (title, description) VALUES (${args[0]}, ${args[1]})`, (error, rows, fields) => {
            if(error) throw error;
            return message.channel.send("Successfully pushed update.");
        });
    }
}