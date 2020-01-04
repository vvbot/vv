const { RichEmbed } = require("discord.js");

module.exports = {
    name: "item-info",
    description: "Supplies info on the given item from the Nanite store",
    args: true,
    async execute(message, args, client, logger) {
        if (args[0].toUpperCase() == "PSIBOOST" || args[0].toUpperCase() == "PB" || args[0].toUpperCase() == "PSI" || args[0].toUpperCase() == "2") {
            const embed = new RichEmbed()
                .setTitle("PsiBoost™")
                .setDescription("Permanently double the ammount of rep bestowed upon you by other users")
                .addField("Ammount:", "x2", true)
                .addField("Stacks:", "True", true)
                .addField("ID:", "2", true)
            client.fixEmbed(embed);
            message.channel.send(embed);
        }else if (args[0].toUpperCase() == "BRAWNBOOST" || args[0].toUpperCase() == "BB" || args[0].toUpperCase() == "BRAWN" || args[0].toUpperCase() == "1") {
            const embed = new RichEmbed()
                .setTitle("BrawnBoost™")
                .setDescription(`Permanently double the ammount of coins bestowed upon you through the **${client.prefix}**daily command.`)
                .addField("Ammount:", "x2", true)
                .addField("Stacks:", "True", true)
                .addField("ID:", "1", true)
            client.fixEmbed(embed);
            message.channel.send(embed);
        }
    }
}
