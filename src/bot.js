require("dotenv").config();
const Discord = require("discord.js");
const sh0danClient = require("./struct/Client");
const package = require("../package.json");
const config = require("../config.json");
const winston = require("winston");
const chalk = require("chalk");


const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: config.bot.log_file_name || "log.txt" })
    ],
    format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`)
})

const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const client = new sh0danClient();

client.once("ready", async () => {
    logger.info(`${chalk.magenta(client.user.username)} is online`);
    logger.info(`Prefix set to ${chalk.magenta(config.bot.prefix)}`);
    logger.info(`${chalk.magenta(client.commands.array().length)} commands loaded`);
    logger.info(`Program Version: ${chalk.blue("v" + package.version)}`);
    logger.info(`Node Version: ${chalk.blue(process.version)}`);
    logger.info(`Discord.js Version ${chalk.blue(package.dependencies["discord.js"].replace("^", "v"))}`)   
    if(config.bot.debug_mode === true) logger.info(chalk.grey("Started in DEBUG MODE"));

    client.user.setActivity("wi7h Axe1");

    client.sql.query(`UPDATE analytics SET startup_count = startup_count + 1 WHERE bot ="shodan"`, error => {
        if(error) return logger.error(chalk.redBright(error));
    });

});

client.on("message", async message => {
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(config.bot.prefix)})\\s*`);
    if (!prefixRegex.test(message.content) || message.author.bot) return;

    const [, prefix] = message.content.match(prefixRegex);
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    if(config.bot.debug_mode === true) logger.info(`Command run: ${chalk.green(args[0])}`);
    const commandName = args.shift().toLowerCase();
    
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.args && !args.length) {
        let reply = `No arguments were provided`;

        if (command.usage) reply += `\nThe proper usage of that command is: \`${config.bot.prefix}${command.name} ${command.usage}\``;

        message.channel.send(reply);
    }

    if (command.guildOnly && message.channel.type !== "text") return message.channel.send("Please try executing this command inside a Guild.");
    if (command.disabled && !config.bot.admins.includes(message.author.id)) return;
    if (command.adminOnly && !config.bot.admins.includes(message.author.id)) return message.channel.send(`Unfortunatly ${message.author} you lack the required clearance level for this command. Try contactign a system administrator for further assistance`);
    
    if (!client.cooldowns.has(command.name)) {
        client.cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = client.cooldowns.get(command.name);
    const cooldownTime = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expiration = timestamps.get(message.author.id) + cooldownTime;

        if (now < expiration) {
            const timeLeft = (expiration - now) / 1000;
            return message.reply(`${message.channel.type === "dm" ? "T" : ", t"}hat command (**${command.name}**) is unusable for another ${timeLeft.toFixed(1)} seconds. Please be patient.`);
        }
    }

    if(!config.bot.admins.includes(message.author.id)) timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownTime);

    try {
        message.channel.startTyping();
        command.execute(message, args, client, logger, Discord);
        message.channel.stopTyping();

        client.sql.query(`UPDATE analytics SET commands_ran = commands_ran + 1 WHERE bot ="shodan"`, error => {
            if (error) return logger.error(chalk.redBright(error));
        });
    } catch (error) {
        if(command.preventDefualtError === true) return;
        logger.log("error", chalk.redBright(error));
        message.channel.send("Oh no! There was an error trying to execute that command! Please try again momentarily");
        client.sql.query(`UPDATE analytics SET commands_failed = commands_failed + 1 WHERE bot ="shodan"`, error => {
            if (error) return logger.error(chalk.redBright(error));
        });
    }
});

client.on("debug", m => logger.debug( chalk.gray(m)));
client.on("warn", m => logger.warn(chalk.yellowBright(m)));
client.on("error", m => logger.error(chalk.redBright(m)));

//process.on("uncaughtException", error => logger.error(chalk.redBright(error)));

require("./web/app.js")(client);
client.login(config.bot.token);