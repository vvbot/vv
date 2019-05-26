module.exports = {
    name: "delete-update",
    description: "Deletes a new update tile for my online interface.",
    args: true,
    usage: "[ID]",
    cooldown: 5,
    adminOnly: true,
    async execute(message, args, client, logger) {
        client.sql.query(`DELETE FROM updates WHERE id = ${args[0]}`, (error, rows, fields) => {
            if (error) throw error;
            return message.channel.send("Successfully rolled back update.");
        });
    }
}