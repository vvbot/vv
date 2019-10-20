const Discord = require("discord.js");
const _mysql = require("mysql2/promise");
const config = require("../../config.json");
const { join } = require("path");
const fs = require("fs");
const beautify = require("js-beautify").js;
const NekoClient = require('nekos.life');
const Util = require("../util/Util");

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

        /*const connection = _mysql.createConnection({
            host: config.mysql.host,
            user: config.mysql.username,
            password: config.mysql.password,
            database: config.mysql.database
        }); */
        
        //this.sql = connection;

        this.github = "https://github.com/axelgreavette/sh0dan";

        const { sfw , nsfw } = new NekoClient();

        this.nekos = sfw;
        this.NSFW_nekos = nsfw;

        this.utils = Util;

        this._presence = {
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
                { type: "LISTENING", title: "songs about Git"},
                { type: "LISTENING", title: "Technologic by Daft Punk" },
                { type: "WATCHING", title: "over the Von Braun" },
                { type: "WATCHING", title: "Citadel Station" },
                { type: "PLAYING", title: "with the End" },
                { type: "PLAYING", title: "with The Many" },
                { type: "PLAYING", title: "with the D-Zone" },
                { type: "PLAYING", title: "with Sakira" },
                { type: "WATCHING", title: "endless space go by" },
                { type: "STREAMING", title: "data through a pipe" },
                { type: "PLAYING", title: "Cards Against Humanity" }
            ],
            random: () => {
                return this.randomItem(this._presence.activities);
            },
            next: async (iteration = 1) => {
                let current = { type: this._presence.activities.find(a => { return a.title == this.user.presence.game.name }).type, title: this.user.presence.game.name };
                console.log(current);
                let nextIndex = (iteration > this._presence.activities.length) ? this._presence.activities.length - 1: this._presence.activities.map(act => act.title).indexOf(current.title) + iteration;
                console.log(nextIndex)
                await this.user.setActivity(`${this._presence.activities[nextIndex].title} | ${config.bot.prefix}help`, { url: "https://shodanbot.com", type: this._presence.activities[nextIndex].type });
                return {
                    type: this._presence.activities[nextIndex].type,
                    title: this._presence.activities[nextIndex].title
                };
            },
            fix: async () => {
                let current = { type: this._presence.activities.find(a => { return a.title == this.user.presence.game.name }).type, title: this.user.presence.game.name };
                let index = this._presence.activities.map(act => act.title).indexOf(current.title);
                if(this.user.presence.game.type !== this._presence.activities[index].type) await this.user.setActivity(`this._presence.activities[index].title  | ${config.bot.prefix}help`, { url: "https://shodanbot.com", type: this._presence.activities[index].type });
                return {
                    type: this._presence.activities[nextIndex].type,
                    title: this._presence.activities[nextIndex].title
                };
            },
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
        let cleanRegex = new RegExp(`(${this.config.bot.token}|${this.config.web["chewey-bot"]}|${this.config.webhooks.AGC.token}|${this.config.mysql.host}|${this.config.mysql.password}|${this.config.mysql.username}|${this.ws.connection.sessionID})`, "g");

        if (text.indexOf(this.config.bot.token) !== -1 || text.indexOf(this.config.web["chewey-bot"]) !== -1 || text.indexOf(this.config.webhooks.AGC.token) !== -1 || text.indexOf(this.config.mysql.host) !== -1 || text.indexOf(this.config.mysql.username) !== -1 || text.indexOf(this.ws.connection.sessionID) !== -1) text = text.replace(cleanRegex, this.randomItem(["[redacted]", "[DATA EXPUNGED]", "[REMOVED]", "[SEE APPENDIUM INDEX A494-B]"]));
        if (text.indexOf(decodeURIComponent(this.config.web["ping-api"])) !== -1) text = text.replace(decodeURIComponent(this.config.web["ping-api"]), this.randomItem(["[redacted]", "[DATA EXPUNGED]", "[REMOVED]", "[SEE APPENDIUM INDEX A494-B]"]));
        if (text.indexOf(this.config.web["ping-api"]) !== -1) text = text.replace(this.config.web["ping-api"], this.randomItem(["[redacted]", "[DATA EXPUNGED]", "[REMOVED]", "[SEE APPENDIUM INDEX A494-B]"]));
        
        if (typeof (text) === "string") text = text.replace(/` /g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));

        text = beautify(text, {
            indent_size: 4,
            space_in_empty_paren: true
        });
        
        return text;
    }

    /**
     * Selects and returns a random item from the given array.
     * @property {Array} array The array to select the random item from
     */
    randomItem (array) {
        return array[~~(array.length * Math.random())];
    }

    /**
     * Humanizes the bot's uptime
     * @returns {object} An object containing a formatted time-string and a humanized time string
     */
    uptime () {
        let msec = Number(process.uptime().toFixed(0)) * 1000;
        let days = Math.floor(msec / 1000 / 60 / 60 / 24);
        msec -= days * 1000 * 60 * 60 * 24;
        let hours = Math.floor(msec / 1000 / 60 / 60);
        msec -= hours * 1000 * 60 * 60;
        let mins = Math.floor(msec / 1000 / 60);
        msec -= mins * 1000 * 60;
        let secs = Math.floor(msec / 1000);

        let timestr = {
            formatted: "",
            humanized: ""
        };

        if (days > 0) {
            timestr.humanized += days + " days ";
            timestr.formatted += days + "d ";
        }
        if (hours > 0) {
            timestr.humanized += hours + " hours ";
            timestr.formatted += hours + "h ";
        }
        if (mins > 0) {
            timestr.humanized += mins + " minutes ";
            timestr.formatted += mins + "m ";
        }
        if (secs > 0) {
            timestr.humanized += secs + " seconds";
            timestr.formatted += secs + "s ";
        }

        return timestr;
    }

    /**
     * Cuts off the end of a text block to shorten it to the length supplied to maxLen
     * @param {String} text 
     * @param {Integer}} maxLen 
     */
    shorten(text, maxLen = 2000) {
        return text.length > maxLen ? `${text.substr(0,maxLen-3)}...` : text;
    }

    async createConnection() {
        const connection = await _mysql.createPool({
            host: config.mysql.host,
            user: config.mysql.username,
            password: config.mysql.password,
            database: config.mysql.database,
            port: 25060,
            ssl: {
                ca: fs.readFileSync(join(__dirname, "..", "..", "security", "sh0dan.crt"))
            },
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        return this.sql = connection;
    }
}
