const Discord = require("discord.js");
const _mysql = require("mysql");
const config = require("../../config.json");
const { join } = require("path");
const fs = require("fs");
const beautify = require("js-beautify").js;

module.exports = class sh0danClient extends Discord.Client {
    constructor(options) {
        super(options);
        
        this.commandsFolder = join(__dirname, "..", "commands");
        this.commands = new Discord.Collection();
        this.cooldowns = new Discord.Collection();
        const Commands = fs.readdirSync(this.commandsFolder).filter(file => file.endsWith(".js"));
        
        this.prefix = config.bot.prefix;
        this.config = config;

        this.giveaways = new Discord.Collection();

        for (const File of Commands) {
            const cmd = require(`../commands/${File}`);

            this.commands.set(cmd.name, cmd);
        }
    
        this.webhooks = {
            AGC: new Discord.WebhookClient(config.webhooks.AGC.id, config.webhooks.AGC.token)
        }

        const connection = _mysql.createConnection({
            host: config.mysql.host,
            user: config.mysql.username,
            password: config.mysql.password,
            database: config.mysql.database
        });
        
        this.sql = connection;

        this.presence = {
            activities: [
                { type: "PLAYING", title: "wi7h Axe1" },
                { type: "PLAYING", title: "with my API" },
                { type: "PLAYING", title: "ded" },
                { type: "PLAYING", title: "with Sakira" },
                { type: "WATCHING", title: "YmlyZSBQbmZmdnFs" },
                { type: "PLAYING", title: "with the Cortex Reavers" },
                { type: "PLAYING", title: "with the ship" },
                { type: "WATCHING", title: "shodanbot.com" },
                { type: "WATCHING", title: "api.shodanbot.com" },
                { type: "STREAMING", title: "my s0urce" },
                { type: "LISTENING", title: "songs about Git"}
            ],
            random: () => {
                return this.randomItem(this.presence.activities);
            },
            next: async (iteration = 1) => {
                let current = { type: this.presence.activities.find(a => { return a.title == this.user.presence.game.name }).type, title: this.user.presence.game.name };
                let nextIndex = this.presence.activities.map(act => act.title).indexOf(current.title) + iteration;
                await this.user.setActivity(this.presence.activities[nextIndex].title, { url: "https://shodanbot.com", type: this.presence.activities[nextIndex].type });
            },
            fix: async () => {
                let current = { type: this.presence.activities.find(a => { return a.title == this.user.presence.game.name }).type, title: this.user.presence.game.name };
                let index = this.presence.activities.map(act => act.title).indexOf(current.title);
                if(this.user.presence.game.type !== this.presence.activities[index].type) await this.user.setActivity(this.presence.activities[index].title, { url: "https://shodanbot.com", type: this.presence.activities[index].type });
            }
        };

        this.emojiUtils = {
            emojis: {
                "nanites": "<:Nanites:592464037279826095>"
            }
        };

        this.economy = {
            itemCosts: {
                "brawnBoost": 2500,
                "psiBoost": 5000,
                "hardReset": 10000
            },
            defaultColour: "36393F"
        };

        
    }

    /**
     * Finds a member from a string, mention, or id
     * @property {string} msg The message to process
     * @property {string} suffix The username to search for
     * @property {bool} self Whether or not to defualt to yourself if no results are returned. Defualts to false.
     */
    findMember (msg, suffix, self = false) {
        if (!suffix) {
            if (self) return msg.member;
            else return null;
        } else {
            let member = msg.mentions.members.first() || msg.guild.members.get(suffix) || msg.guild.members.find(m => m.displayName.toLowerCase().includes(suffix.toLowerCase()) || m.user.username.toLowerCase().includes(suffix.toLowerCase()));
            return member;
        }
    }

    /**
     * Fixes an embed by adding the author and colour.
     * @property {RichEmbed} The Embed to fix
     */
    fixEmbed (embed) {
        embed
            .setColor("RANDOM")
            .setAuthor(this.user.username, this.user.displayAvatarURL)
    }

    /**
     * Replaces certain characters and fixes mentions in messages.
     * @property {string} text The text to clean
     */
    clean (text) {
        let cleanRegex = new RegExp(`'(${this.config.bot.token}|${this.config.web["chewey-bot"]}|${this.config.webhooks.AGC.token}|${this.config.mysql.host}|${this.config.mysql.password}|${this.config.mysql.username})'`, "g");

        if (text.match(cleanRegex)) return text = text.replace(cleanRegex, "[redacted]");
        if (typeof (text) === "string") return text = text.replace(/` /g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));

        return beautify(text, {
            indent_size: 4,
            space_in_empty_paren: true
        });
    }

    /**
     * Selects and returns a random item from the given array.
     * @property {Array} array The array to select the random item from
     */
    randomItem (array) {
        return array[~~(array.length * Math.random())]
    }

    /**
     * Humanizes the bot's uptime
     */
    uptime() {
        var msec = process.uptime().toFixed(0) * 1000;
        var days = Math.floor(msec / 1000 / 60 / 60 / 24);
        msec -= days * 1000 * 60 * 60 * 24;
        var hours = Math.floor(msec / 1000 / 60 / 60);
        msec -= hours * 1000 * 60 * 60;
        var mins = Math.floor(msec / 1000 / 60);
        msec -= mins * 1000 * 60;
        var secs = Math.floor(msec / 1000);
        var timestr = "";
        if (days > 0) {
            timestr += days + "d ";
        }
        if (hours > 0) {
            timestr += hours + "h ";
        }
        if (mins > 0) {
            timestr += mins + "m ";
        }
        if (secs > 0) {
            timestr += secs + "s";
        }
        return timestr
    }

}