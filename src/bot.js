//TODO: Update for Discord.js V12.0.1

require("dotenv").config();
const Discord = require("discord.js");
const VV = require("./struct/Client");
const package = require("../package.json");
const winston = require("winston");
const chalk = require("chalk");
const moment = require("moment");

const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const client = new VV();

process.argv = process.argv.slice(2);

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: client.config.bot.log_file_name || "log.txt" })
    ],
    format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`)
});

client.once("ready", async () => {
    logger.info(`${chalk.magenta(client.user.username)} is online`);
    logger.info(`Prefix set to ${chalk.magenta(client.prefix)}`);
    logger.info(`${chalk.magenta(client.commands.array().length)} commands loaded`);
    logger.info(`Program Version: ${chalk.blue("v" + package.version)}`);
    logger.info(`Node Version: ${chalk.blue(process.version)}`);
    logger.info(`Discord.js Version ${chalk.blue(package.dependencies["discord.js"].replace("^", "v"))}`)   ;
    
    if(client.config.bot.debug_mode || process.argv[0] == "--debug") logger.info(chalk.grey("Started in DEBUG MODE"));

    await client.user.setActivity("with Axel", { type: client._presence.activities[0].type });
    setInterval(() => {
        let activity = client._presence.random();
        client.user.setActivity(activity.title, { type: activity.type });
    }, 300000);

});

client.on("message", async message => {

    //Prefix Logic
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(client.prefix)})`);
    if (!prefixRegex.test(message.content) || message.author.bot) return;

    //Search for words that look like a command
    const [, prefix] = message.content.match(prefixRegex);
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    if(args.length === 0 || args[0] === "") return;
    const commandName = args.shift().toLowerCase();
    
    //Get dat command
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    //Check for a command
    if (!command) return;

    //Check for command arguments
    if (command.args && !args.length) {
        let reply = `No arguments were provided`;

        if (command.usage) reply += `\nThe proper usage of that command is: \`${client.prefix}${command.name} ${command.usage}\``;

        await message.channel.send(reply);
        return;
    }

    //Checks for guildOnly, disabled, adminOnly, and nsfw
    if (command.guildOnly && message.channel.type !== "text") return message.channel.send("Please try executing this command inside of a Guild (server).");
    if (command.disabled && !client.config.bot.admins.includes(message.author.id)) return message.channel.send("That command is either non-existent or it is (globally) disabled. Please try again later.");
    if (command.adminOnly && !client.config.bot.admins.includes(message.author.id)) return message.channel.send(`Unfortunately ${message.author} you lack the required clearance level for this command. Try contacting a system administrator for further assistance`);
    if (command.nsfw && !message.channel.nsfw) return message.channel.send("I can't do that outside of an NSFW channel :\(")

    //Check for command cooldowns
    if (!client.cooldowns.has(command.name)) {
        client.cooldowns.set(command.name, new Discord.Collection());
    }
    //If we find a cooldown make it happen
    const now = Date.now();
    const timestamps = client.cooldowns.get(command.name);
    const cooldownTime = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expiration = timestamps.get(message.author.id) + cooldownTime;

        if (now < expiration) {
            const timeLeft = (expiration - now) / 1000;
            return message.reply(`${message.channel.type === "dm" ? "T" : ", t"}hat command (**${command.name}**) is unusable for another ${moment("2015-01-01").startOf("day").seconds(timeLeft).format("h m s")}. Please be patient.`);
        }
    }
    //Unless the user is an admin of the bot
    if (!client.config.bot.admins.includes(message.author.id)) timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownTime);

    //Actually send the command result IF it passes all the previous checks
    try {
        message.channel.startTyping();
        await command.execute(message, args, client, Discord);
        message.channel.stopTyping();
        if (client.config.bot.debug_mode || process.argv[0] == "--debug") logger.info(`Command run: ${chalk.green(command.name)}`);
    } catch (error) {
        if(command.preventDefaultError === true) {
            message.channel.stopTyping();
            return await command.error(message, args, client, error);
        };
        logger.log("error", chalk.redBright(error));
        await message.channel.send("Shit, there was an error trying to execute that command! Please try again momentarily.");
        message.channel.stopTyping();
    }
});

client.on("debug", m => logger.debug(chalk.gray(m)));
client.on("warn", m => logger.warn(chalk.yellowBright(m)));
client.on("error", m => logger.error(chalk.redBright(m)));

//process.on("uncaughtException", error => logger.error(chalk.redBright(error)));

client.login(client.config.bot.token).then(()=>{});