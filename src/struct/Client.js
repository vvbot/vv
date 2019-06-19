const { Client, WebhookClient, Collection } = require("discord.js");
const _mysql = require("mysql");
const config = require("../../config.json");
const { join } = require("path");
const fs = require("fs");
const beautify = require("js-beautify").js;

module.exports = class sh0danClient extends Client {
    constructor(options) {
        super(options);
        
        this.commandsFolder = join(__dirname, "..", "commands");
        this.commands = new Collection();
        this.cooldowns = new Collection();
        const Commands = fs.readdirSync(this.commandsFolder).filter(file => file.endsWith(".js"));
        
        this.prefix = config.bot.prefix;
        this.config = config;

        this.giveaways = new Collection();

        for (const File of Commands) {
            const cmd = require(`../commands/${File}`);

            this.commands.set(cmd.name, cmd);
        }
    
        this.webhooks = {
            AGC: new WebhookClient(config.webhooks.AGC.id, config.webhooks.AGC.token)
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
            }
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
     * @property {array} array The array to select the random item from
     */
    randomItem (array) {
        return array[~~(array.length * Math.random())]
    }
}