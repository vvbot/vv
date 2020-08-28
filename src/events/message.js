//TODO: Complete redo this

const { green, redBright } = require("chalk");
const ms = require("ms");
const { Collection } = require("discord.js");

const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

module.exports = async (client, message) => {
    client.messagesSeen++;

    let match;
    for (const pattern of client.autoPatterns) {
        if (message.content.match(pattern) && !message.content.startsWith(client.prefix)) {
            match = pattern;
            break;
        }
    }
    
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(client.prefix)})`);
    if (!match && !prefixRegex.test(message.content) || message.author.bot) return;
    if (match) {
        let auto_args = message.content.trim().split(/ +/);
        let command = client.autoCommands.get(match);
        if(command.disabled) return;
        return command.executeAuto(message, auto_args, client);
    }

    const [, prefix] = message.content.match(prefixRegex);
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    if (args.length === 0 || args[0] === "") return;

    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.args && !args.length) {
        let reply = "No arguments were provided";

        if (command.usage) reply += `\nThe proper usage of that command is: \`${client.prefix}${command.name} ${command.usage}\``;

        await message.channel.send(reply);
        return;
    }

    if (command.guildOnly && message.channel.type !== "text") return message.channel.send("Sorry, that command is restricted to server-usage only.");
    if (command.disabled && !client.isOwner(message.author.id)) return message.channel.send("Unfortunately that command is either globally disabled, or doesn't exist.");
    if (command.adminOnly && !client.isOwner(message.author.id)) return message.channel.send(`Unfortunately ${message.author} you lack the required clearance level for this command. Try contacting a system administrator for further assistance`);

    if (!client.cooldowns.has(command.name)) client.cooldowns.set(command.name, new Collection());

    const now = Date.now();
    const timestamps = client.cooldowns.get(command.name);
    const cooldownTime = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expiration = timestamps.get(message.author.id) + cooldownTime;

        if (now < expiration) {
            const timeLeft = (expiration - now) / 1000;
            return message.reply(`${message.channel.type === "dm" ? "T" : ", t"}hat command (**${command.name}**) is unusable for another ${ms(timeLeft)}. Please be patient.`);
        }
    }

    if (!client.config.bot.admins.includes(message.author.id) && client.ownerID !== message.author.id) timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownTime);

    try {
        message.channel.startTyping();
        client.incrementUsages(command);
        await command.execute(message, args, client);
        message.channel.stopTyping();
        if (client.debug) client.logger.info(`Command run: ${green(command.name)}`);
    } catch (error) {
        if (command.preventDefaultError === true) {
            message.channel.stopTyping();
            return await command.error(message, args, client, error);
        }
        client.logger.log("error", redBright(error));
        await message.channel.send("Unfortunately, an error occurred with that command.");
        message.channel.stopTyping();
    }
};