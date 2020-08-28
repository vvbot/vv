const Discord = require("discord.js");
const { join } = require("path");
const { readdir, readdirSync, fstat, readFileSync} = require("fs");
const beautify = require("js-beautify").js;
const NekoClient = require('nekos.life');

const utils = require("../util/utils");
const config = require("../../config.json");
const logger = require("../util/logger");

module.exports = class VV extends Discord.Client {
    constructor(options) {
        super(options);
                
        this.prefix = config.bot.prefix
        this.config = config;
        this.logger = logger;
        this.utils = utils;
        this.github = "https://github.com/axelgreavette/vv";

        this.commandPath = join(__dirname, "..", "commands");
        this.eventPath = join(__dirname, "..", "events");
        this.commands = new Discord.Collection();
        this.autoCommands = new Discord.Collection();
        this.autoPatterns = [];
        this.categories = [];
        this.catDescs = {
            all: "All of my usable commands :)"
        };

        this.messagesSeen = 0;
        this.commandsExecuted = 0;
        this.commandUsages = {};
        
         this.webhooks = {
            N: new Discord.WebhookClient(config.webhooks.N.id, config.webhooks.N.token)
        }
        
        this.cooldowns = new Discord.Collection();
        this.giveaways = new Discord.Collection();
        this.games = new Discord.Collection();

        this.nekos = new NekoClient().sfw;
        

        (process.argv.includes("--debug" || "--d")) ? this.debug = true : this.debug = false;

        /*for (const File of Commands) {
            const cmd = require(`../commands/${File}`);

            this.commands.set(cmd.name, cmd);
        }*/

        this._presence = {
            activities: [
                { type: 0, title: "Tic Tac Toe" },
                { type: 0, title: "Hide & Go Seek" },
                { type: 0, title: "with Axel" },
                { type: 3, title: "anime" }
            ],
            random: () => {
                return this.utils.randomItem(this._presence.activities);
            },
            next: async (iteration = 1) => {
                let current = { type: this._presence.activities.find(a => { return a.title == this.user.presence.activities[0].name }).type, title:this.user.presence.activities[0].name };
                let nextIndex = (iteration > this._presence.activities.length) ? this._presence.activities.length - 1: this._presence.activities.map(act => act.title).indexOf(current.title) + iteration;
                await this.user.setActivity(this._presence.activities[nextIndex].title, { type: this._presence.activities[nextIndex].type });
                return {
                    type: this._presence.activities[nextIndex].type,
                    title: this._presence.activities[nextIndex].title
                };
            },
            fix: async () => {
                let current = { type: this._presence.activities.find(a => { return a.title == this.user.presence.activities[0].name }).type, title: this.user.presence.activities[0].name };
                let index = this._presence.activities.map(act => act.title).indexOf(current.title);
                if(this.user.presence.activities[0].type !== this._presence.activities[index].type) await this.user.setActivity(this._presence.activities[index].title, { type: this._presence.activities[index].type });
                return {
                    type: this._presence.activities[index].type,
                    title: this._presence.activities[index].title
                };
            },
        };
    }

    
    /**
     * Replaces certain characters and fixes mentions in messages.
     * @property {string} text The text to clean
     */
    clean (text) {
        let cleanRegex = new RegExp(`(${this.config.bot.token}|${this.config.web["chewey-bot"]}|${this.config.webhooks.N.token}|${this.config.web.nasa})`, "g");

        if (text.indexOf(this.config.bot.token) !== -1 || text.indexOf(this.config.web["chewey-bot"]) !== -1 || text.indexOf(this.config.webhooks.N.token) || text.indexOf(this.config.web.nasa) !== -1) text = text.replace(cleanRegex, this.utils.randomItem(["frig off", "Nah", "nope", "I'm good"]));
        if (text.indexOf(decodeURIComponent(this.config.web["ping-api"])) !== -1) text = text.replace(decodeURIComponent(this.config.web["ping-api"]), this.utils.randomItem(["go away", "stop touching me there", "shut"]));
        if (text.indexOf(this.config.web["ping-api"]) !== -1) text = text.replace(this.config.web["ping-api"], this.utils.randomItem(["ew", "loser", "You wish"]));
        
        if (typeof (text) === "string") text = text.replace(/` /g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));

        text = beautify(text, {
            indent_size: 4,
            space_in_empty_paren: true
        });
        
        return text;
    }
    
    /**
     * Loads all available events
     * @param {string} path 
     */
    loadEvents(path = this.eventPath) {
        readdir(path, (err, files) => {
            if (err) this.logger.error(err);
            files = files.filter(f => f.split(".").pop() === "js");
            if (files.length === 0) return this.logger.warn("No events found");
            if(this.debug) this.logger.info(`${files.length} event(s) found...`);
            
            files.forEach(f => {
                const eventName = f.substring(0, f.indexOf(".")).toLowerCase();
                const event = require(join(path, f));

                super.on(eventName, event.bind(null, this));

                delete require.cache[require.resolve(join(path, f))]; // Clear cache
                
                if(this.debug) this.logger.info(`Loading event: ${eventName}`);
            });
        });

        return this;
    }

    /**
     * Load all available commands.
     * @param {string} path The path to load commands from. Defaults to client.commandPath
     */
    loadCommands(path = this.commandPath) {
        let Commands = [];

        this.utils.getDirectories(path).forEach(d => {
            if(d == "disabled") return;
            let commands = readdirSync(join(path, d)).filter(file => file.endsWith(".js")).map(path => `${d}/${path}`);
            Commands = Commands.concat(...commands);
        });

        if(this.debug) this.logger.info(`${Commands.length} commands found`);

        for (const File of Commands) {
            const cmd = require(`../commands/${File}`);
            let category = File.split("/")[0];

            if(cmd.auto && cmd.patterns) {
                cmd.patterns.forEach(p => {
                    this.autoCommands.set(p, cmd);
                    this.autoPatterns.push(p);
                });

                cmd.ABSOLUTE_PATH = File;
                cmd.category = category;
                this.commands.set(cmd.name, cmd);
            }

            cmd.ABSOLUTE_PATH = File;
            cmd.category = category;

            if(cmd.category == "developer" && !cmd.adminOnly) cmd.adminOnly = true;

            this.commands.set(cmd.name, cmd);
            if(this.debug) this.logger.info(`Loaded command: ${cmd.name}`);
        }

        return this;
    }


    /**
     * Load all available category data, such as names and descriptions.
     * @param {string} path The path to load categories from. Defaults to client.commandPath
     */
    loadCategories(path = this.commandPath) {
        let raw = [];
    
        this.utils.getDirectories(path).forEach(d => {
            this.categories = this.categories.concat([d]);
            let res = readdirSync(join(path, d)).filter(file => file.endsWith(".txt")).map(path => `${d}/${path}`)[0];
            if(!res) return;
            raw = raw.concat([res]);
        });

        for (const desc of raw) {
            this.catDescs[desc.split("/")[0]] = readFileSync(join(path, desc), { encoding: "utf-8" });
        }

        raw = [];

        return this;
    }

    /**
     * Initializes Stheno.
     * @param {string} token The bot token
     */
    init(token = this.config.bot.token) {
        this.loadEvents();
        this.loadCommands();
        this.loadCategories();
        this.login(token);
    } 

    /**
     * Checks if user is the bot owner
     * @param {User} user 
     */
    isOwner(user) {
        if (user.id === this.ownerId) return true;
        else return false;
    }
    
    /**
     * Increments the use count for a command.
     * @param {Command} cmd Command to operate with
     * @author Chris you beautiful person
     */
    incrementUsages(cmd) {
        if (!this.commandUsages.hasOwnProperty(cmd.name)) this.commandUsages[cmd.name] = 0;

        if (["eval", "exec", "debug", "rebuild_auto", "rebuild_descriptions", "load", "unload", "reload", "ping", "webhook"].includes(cmd.name)) {
            this.commandsExecuted++;
            delete this.commandUsages[cmd.name];
        } else {
            this.commandsExecuted++;
            this.commandUsages[cmd.name] = (this.commandUsages[cmd.name] || 0) + 1;
        }
    }
}
