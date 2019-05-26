module.exports = {
    name: "new-update",
    description: "Creates a new update tile for my online interface.",
    args: true,
    usage: "[TITLE] [DESCRIPTION]",
    cooldown: 5,
    adminOnly: true,
    async execute(message, args, client, logger) {        
        args = args.join(" ");
        let title = args.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
        let description = args.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[1];
        client.sql.query(`INSERT INTO updates (title, description) VALUES ("${title}", "${description}")`, (error, rows, fields) => {
            if(error) throw error;
            return message.channel.send("Successfully pushed update.");
        });
    }
}