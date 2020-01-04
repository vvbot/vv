module.exports = {
    name: "buy",
    description: "Purchase an item from the Nanite store",
    args: true,
    async execute(message, args, client, logger) {
        if (args[0].toUpperCase() == "PSIBOOST" || args[0].toUpperCase() == "PB" || args[0].toUpperCase() == "PSI" || args[0].toUpperCase() == "2") {
            client.sql.query(`SELECT * FROM users WHERE id = ${message.author.id}`, (error, rows, fields) => {
                if (error) throw error;
                if (rows[0].nanites < (rows[0].psiBoostsUsed !== 0 ? client.economy.itemCosts.psiBoost * (rows[0].psiBoostsUsed * .7) : client.economy.itemCosts.psiBoost)) return message.channel.send(`You account does not contain enough ${client.emojiUtils.emojis.nanites} to buy this.`);
                else return client.sql.query(`UPDATE users SET nanites = (SELECT nanites WHERE id = ${message.author.id}) - ${rows[0].psiBoostsUsed !== 0 ? client.economy.itemCosts.psiBoost * (rows[0].psiBoostsUsed * .5) : client.economy.itemCosts.psiBoost} WHERE id = ${message.author.id}`, error => {
                    if(error) throw error;
                    client.sql.query(`UPDATE users SET psiBoostsUsed = (SELECT psiBoostsUsed WHERE id = ${message.author.id}) + 1 WHERE id = ${message.author.id}`, error => {
                        if(error) throw error;            
                        else return message.channel.send(`Successfully purchased **PsiBoost™**. **${client.prefix}rep** rewards have been permanently increased by an additional x2`);
                    })
                });
            });
        }else if (args[0].toUpperCase() == "BRAWNBOOST" || args[0].toUpperCase() == "BB" || args[0].toUpperCase() == "BRAWN" || args[0].toUpperCase() == "1") {
            client.sql.query(`SELECT * FROM users WHERE id = ${message.author.id}`, (error, rows, fields) => {
                if(error) throw error;
                if (rows[0].nanites < (rows[0].brawnBoostsUsed !== 0 ? client.economy.itemCosts.brawnBoost * (rows[0].brawnBoostsUsed * .7) : client.economy.itemCosts.brawnBoost)) return message.channel.send(`You account does not contain enough ${client.emojiUtils.emojis.nanites} to buy this.`);
                else return client.sql.query(`UPDATE users SET nanites = (SELECT nanites WHERE id = ${message.author.id}) - ${rows[0].brawnBoostsUsed !== 0 ? client.economy.itemCosts.brawnBoost * (rows[0].brawnBoostsUsed * .5) : client.economy.itemCosts.brawnBoost} WHERE id = ${message.author.id}`, error => {
                    if (error) throw error;
                    client.sql.query(`UPDATE users SET brawnBoostsUsed = (SELECT brawnBoostsUsed WHERE id = ${message.author.id}) + 1 WHERE id = ${message.author.id}`, error => {
                        if (error) throw error;
                        else return message.channel.send(`Successfully purchased **BrawnBoost™**. **${client.prefix}daily** rewards have been permanently increased by an additional x2`);
                    })
                });
            });
        }
    }
}
