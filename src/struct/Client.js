const { Client, WebhookClient, Collection } = require("discord.js");
const _mysql = require("mysql");
const config = require("../../config.json");
const { join } = require("path");
const fs = require("fs");

module.exports = class sh0danClient extends Client {
    constructor(options) {
        super(options);
        
        this.commandsFolder = join(__dirname, "..", "commands");
        this.commands = new Collection();
        this.cooldowns = new Collection();
        const Commands = fs.readdirSync(this.commandsFolder).filter(file => file.endsWith(".js"));

        for (const File of Commands) {
            const cmd = require(`../commands/${File}`);

            this.commands.set(cmd.name, cmd);
        }
        

        this.webhook = {}
        //this.webhook.KSC = new WebhookClient(KSC_WH_ID, KSC_WH_TOKEN, { disableEveryone: true })
        //this.webhook.PMD = new WebhookClient(PMD_WH_ID, PMD_WH_TOKEN, { disableEveryone: true })

        this.findMember = (msg, suffix, self = false) => {
            if (!suffix) {
                if (self) return msg.member
                else return null
            } else {
                let member = msg.mentions.members.first() || msg.guild.members.get(suffix) || msg.guild.members.find(m => m.displayName.toLowerCase().includes(suffix.toLowerCase()) || m.user.username.toLowerCase().includes(suffix.toLowerCase()));
                return member
            }
        }

        this.clean = text => {
            if (typeof (text) === "string") return text.replace(/` /g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else return text;
        }

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