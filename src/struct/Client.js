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

        /**
         * Finds a member from a string, mention, or id
         * @property {string} msg The message to process
         * @property {string} suffix The username to search for
         * @property {bool} self Whether or not to defualt to yourself if no results are returned. Defualts to false.
         */
        this.findMember = (msg, suffix, self = false) => {
            if (!suffix) {
                if (self) return msg.member
                else return null
            } else {
                let member = msg.mentions.members.first() || msg.guild.members.get(suffix) || msg.guild.members.find(m => m.displayName.toLowerCase().includes(suffix.toLowerCase()) || m.user.username.toLowerCase().includes(suffix.toLowerCase()));
                return member
            }
        }

        /**
         * Replaces certain characters and fixes mentions in messages.
         * @property {string} text The text to clean
         */
        this.clean = text => {
            let cleanRegex = new RegExp(`'(${this.config.bot.token}|${this.config.web["chewey-bot"]}|${this.config.webhooks.AGC.token}|${this.config.mysql.host}|${this.config.mysql.password}|${this.config.mysql.username})'`, "g");
            
            if (text.match(cleanRegex)) return text = text.replace(cleanRegex, "[redacted]");
            if (typeof (text) === "string") return text = text.replace(/` /g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            
            return beautify(text, { indent_size: 4, space_in_empty_paren: true });
        }

        /**
         * Fixes an embed by adding the author and colour
         * @property {RichEmbed} The Embed to fix
         */
        this.fixEmbed = embed => {
            embed
                .setColor("RANDOM")
                .setAuthor(this.user.username, this.user.displayAvatarURL)
        }

        const connection = _mysql.createConnection({
            host: config.mysql.host,
            user: config.mysql.username,
            password: config.mysql.password,
            database: config.mysql.database
        });
        
        this.sql = connection;
    }
}