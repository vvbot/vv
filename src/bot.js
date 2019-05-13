require("dotenv").config();
const fs = require("fs");
const Discord = require("discord.js");
const { BOT_PREFIX, BOT_TOKEN } = process.env;
const { join } = require("path");
const package = require("../package.json")
const winston = require("winston");

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "log" })
    ],
    format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`)
})

const client = new Discord.Client();
client.commands = new Discord.Collection();
const Commands = fs.readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));
const cooldowns = new Discord.Collection();


for (const File of Commands) {
    const cmd = require(`./commands/${File}`);

    client.commands.set(cmd.name, cmd);
}

client.once("ready", () => {
    logger.log("info", `${client.user.username} is online.`);
    client.user.setActivity("with Axel");
});

client.on("message", message => {
    if (!message.content.startsWith(BOT_PREFIX) || message.author.bot) return;

    let args = message.content.slice(BOT_PREFIX.length).split(/ +/);
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

        if(now < expiration) {
            const timeLeft = (expiration - now) / 1000;
            return message.reply(`${message.channel.type === "dm" ? "T" : ", t"}hat command (**${command.name}**) is unusable for another ${timeLeft.toFixed(1)} seconds. Please be patient.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownTime);

    try {
        command.execute(message, args, client, logger);
    } catch (error) {
        logger.log("error", error)
        message.channel.send("Oh no! There was an error trying to execute that command! Please try again momentarily")
    }
});

client.on('debug', m => logger.log('debug', m));
client.on('warn', m => logger.log('warn', m));
client.on('error', m => logger.log('error', m));

process.on('uncaughtException', error => logger.log('error', error));

client.login(BOT_TOKEN);