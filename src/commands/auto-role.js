const { stripIndent } = require("common-tags");

module.exports = {
    name: "auto-role",
    description: "Setup or turn off Auto Role functionality in your server.",
    adminOnly: true,
    usage: "[SET, RESET, REMOVE, or VIEW] [BOT or USER] [ROLE MENTION]",
    cooldown: 5,
    async execute(message, args, client, logger) {
        if(!args.length) {
            return message.channel.send(stripIndent`Please try using one of the following sub-commands:
**set**: Set either the **user** or **bot** role to be assigned upon someone joining.
    E.g.: \`${client.prefix}auto-role set user @role\`
    or: \`${client.prefix}auto-role set bot @role\`
**remove**: Remove either the set **user** role or **bot** role.
    E.g.: \`${client.prefix}auto-role remove user\`
    or: \`${client.prefix}auto-role remove bot\`
**reset**: Reset all role settings for this guild.
    E.g.: \`${client.prefix}auto-role reset\`
**view**: View the roles currently set for this guild.
    E.g.: \`${client.prefix}auto-role view\``);
        } else if(args[0].toUpperCase() == "SET") {
            const roleID = message.guild.roles.find(r => r.id == args[2].match(/<@&(\d{18,})>/)[1]).id;
            if(args[1].toUpperCase() == "BOT") {
                const [rows, error] = await client.sql.execute("SELECT `server` FROM `auto-roles` WHERE `server` = ?", [message.guild.id]).catch(console.log);
                if (!rows.length) {
                    await client.sql.execute("INSERT INTO `auto-roles` (server, bot, user) VALUES (?, ?, ?)", [message.guild.id, roleID, null]).catch(console.log);
                    return message.channel.send(`👌. Set the **Bot** auto-role for **${message.guild.name}** to **${args[2]}**`)
                } else {
                    await client.sql.execute("UPDATE `auto-roles` SET `bot` =? WHERE `server` = ?", [roleID, message.guild.id]).catch(console.log);
                    return message.channel.send(`👌. Set the **Bot** auto-role for **${message.guild.name}** to **${args[2]}**`)
                }
            } else if(args[1].toUpperCase() == "USER") {
                const [rows, error] = await client.sql.execute("SELECT `server` FROM `auto-roles` WHERE `server` = ?", [message.guild.id]).catch(console.log);
                if(!rows.length) {
                    await client.sql.execute("INSERT INTO `auto-roles` (server, bot, user) VALUES (?, ?, ?)", [message.guild.id, null, roleID]).catch(console.log);
                    return message.channel.send(`👌. Set the **User** auto-role for **${message.guild.name}** to **${args[2]}**`)
                } else {
                    await client.sql.execute("UPDATE `auto-roles` SET `user` =? WHERE `server` = ?", [roleID, message.guild.id]).catch(console.log);
                    return message.channel.send(`👌. Set the **User** auto-role for **${message.guild.name}** to **${args[2]}**`)
                }
            }
        } else if (args[0].toUpperCase() == "REMOVE") {
            if (args[1].toLowerCase() == "bot") {
                await client.sql.execute("UPDATE `auto-roles` SET `bot` = ? WHERE `server` = ?", [null, message.guild.id]).catch(console.log);
                return message.channel.send(`👌. Removed the **Bot** auto-role for **${message.guild.name}**`)
            } else if (args[1].toLowerCase() == "user") {
                await client.sql.execute("UPDATE `auto-roles` SET `user` = ? WHERE `server` = ?", [null, message.guild.id]).catch(console.log);
                return message.channel.send(`👌. Removed the **User** auto-role for **${message.guild.name}**`)
          }
        } else if (args[0].toUpperCase() == "RESET") {
            await client.sql.execute("DELETE FROM `auto-roles` WHERE `server` = ?", [message.guild.id]).catch(console.log);
            message.channel.send(`👌. Removed auto-role settings for ${message.guild.name}`);
        
        } else if (args[0].toUpperCase() == "VIEW") {
            const [rows, error] = await client.sql.execute("SELECT * FROM `auto-roles` WHERE `server` = ?", [message.guild.id]).catch(console.log);
            if (!rows.length) return message.channel.send(`You have not set up Auto-role for this server. Start the process with \`${client.prefix}auto-role\`!`);
            return message.channel.send(`Auto-role Settings for **${message.guild.name}**:\n**User Auto-role**: ${rows[0].user ? "<@&" + rows[0].user + ">" : "Not Set"}\n**Bot Auto-role**: ${rows[0].bot ? "<@&" + rows[0].bot + ">" : "Not Set"}`)
        }
    }
}