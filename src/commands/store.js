const { RichEmbed } = require("discord.js");

module.exports = {
    name: "store",
    description: "View the Nanite store",
    aliases: ["shop"],
    async execute(message, args, client, logger) {
        client.sql.query(`SELECT * FROM users WHERE id = ${message.author.id}`, (error, rows, fields) => {
            const embed = new RichEmbed()
                .setTitle("Nanite Shop")
                .setDescription("Use this shop to buy items and change how you interact with sh0dan")
                .addField("BrawnBoost™ (ID: 1)", (rows[0].brawnBoostsUsed !== 0 ? client.economy.itemCosts.brawnBoost * (rows[0].brawnBoostsUsed * .7) : client.economy.itemCosts.brawnBoost) + " " + client.emojiUtils.emojis.nanites, true)
                .addField("PsiBoost™ (ID: 2)", (rows[0].psiBoostsUsed !== 0 ? client.economy.itemCosts.psiBoost * (rows[0].psiBoostsUsed * .7) : client.economy.itemCosts.psiBoost) + " " + client.emojiUtils.emojis.nanites, true)
                .setFooter(`Buy items with ${client.prefix}buy [ITEM NAME OR ID] and find out more information on an item with ${client.prefix}info [ITEM NAME OR ID]`)
                client.fixEmbed(embed);
            message.channel.send(embed);
        });
    }
}
