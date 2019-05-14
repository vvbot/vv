require("dotenv").config();
const fs = require("fs");
const Discord = require("discord.js");
const { BOT_PREFIX, BOT_TOKEN, LOG_FILE_NAME, DEBUG_ENV } = process.env;
const { join } = require("path");
const package = require("../package.json")
const winston = require("winston");
const chalk = require("chalk");

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: LOG_FILE_NAME || "log.txt" })
    ],
    format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`)
})

const client = new Discord.Client();
client.commands = new Discord.Collection();
const Commands = fs.readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));
const cooldowns = new Discord.Collection();

client.findMember = function (msg, suffix, self = false) {
    if (!suffix) {
        if (self) return msg.member
        else return null
    } else {
        let member = msg.mentions.members.first() || msg.guild.members.get(suffix) || msg.guild.members.find(m => m.displayName.toLowerCase().includes(suffix.toLowerCase()) || m.user.username.toLowerCase().includes(suffix.toLowerCase()));
        return member
    }
}

for (const File of Commands) {
    const cmd = require(`./commands/${File}`);

    client.commands.set(cmd.name, cmd);
}


client.once("ready", () => {
    logger.info(`${chalk.magenta(client.user.username)} is online`);
    logger.info(`${chalk.magenta(client.commands.array().length)} commands loaded`);
    logger.info(`Program Version: ${chalk.blue("v" + package.version)}`);
    logger.info(`Node Version: ${chalk.blue(process.version)}`);
    logger.info(`Discord.js Version ${chalk.blue(package.dependencies["discord.js"].replace("^", "v"))}`)   
    if(DEBUG_ENV === "true") logger.info(chalk.grey("Started in DEBUG MODE"));

    client.user.setActivity("wi7h Axe1");
    client.defualtEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(client.user.username, client.user.displayAvatarURL)


});

client.on("message", message => {
    if (!message.content.startsWith(BOT_PREFIX) || message.author.bot) return;

    const args = message.content.slice(BOT_PREFIX.length).split(/ +/);
    if(DEBUG_ENV === "true") logger.info(`Command run: ${chalk.green(args[0])}`);
    const commandName = args.shift().toLowerCase();
    
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.args && !args.length) {
        let reply = `No arguments were provided`;

        if (command.usage) reply += `\nThe proper usage of that command is: \`${BOT_PREFIX}${command.name} ${command.usage}\``;

        message.channel.send(reply);
    }


    if (command.guildOnly && message.channel.type !== "text") return message.channel.send("Please try executing this command inside a Guild.");
    if (command.disabled && command.disabled === true) return;
    if (command.adminOnly && command.adminOnly === true && !package.bot.admins.includes(message.author.id)) return message.channel.send(`Unfortunatly ${message.author} you lack the required clearance level for this command. Try contactign a system administrator for further assistance`);
    
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownTime = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expiration = timestamps.get(message.author.id) + cooldownTime;

        if (now < expiration) {
            const timeLeft = (expiration - now) / 1000;
            return message.reply(`${message.channel.type === "dm" ? "T" : ", t"}hat command (**${command.name}**) is unusable for another ${timeLeft.toFixed(1)} seconds. Please be patient.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownTime);

    try {
        command.execute(message, args, client, logger);
    } catch (error) {
        logger.log("error", chalk.redBright(error));
        message.channel.send("Oh no! There was an error trying to execute that command! Please try again momentarily");
    }
});

client.on("debug", m => logger.debug( chalk.gray(m)));
client.on("warn", m => logger.warn(chalk.yellowBright(m)));
client.on("error", m => logger.error(chalk.redBright(m)));

process.on("uncaughtException", error => logger.error(chalk.redBright(error)));

client.login(BOT_TOKEN);