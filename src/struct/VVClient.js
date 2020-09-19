const { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler } = require("discord-akairo");
const { WebhookClient } = require("discord.js");
const { join  } = require("path");
const { createHash } = require("crypto");
const signale = require("signale");

const config = require("../../config.js");
const { version } = require("../../package.json");

module.exports = class VVClient extends AkairoClient {
    constructor() {
        super({
            ownerID: config.admins,
        }, {
            disableMentions: "everyone"
        });

        /** Assign prefix and other junk to class props */
        this.config = config;
        this.prefix = this.config.prefix;
        this.version = version;
        this.presenceDelay = 300000;

        this.urls = {
            githun: "https://github.com/vvbot/vv",
            server: "https://discord.gg/cYxEDNN",
            info: "https://vv.axelg.xyz",
            me: "https://discord.com/api/oauth2/authorize?client_id=378909180666314754&permissions=388160&scope=bot"
        }

        this.oldColor = 0xFF69B4; // Hot Pink for archival purposes.
        this.color = 0xf6ad46;    // Burnt Orange colour used in avatar.

        this.fakeToken = createHash("md5").update("https://www.youtube.com/watch?v=dQw4w9WgXcQ").digest("hex"); // hehe

        this.commandsExecuted = 0;
        this.messagesSeen = 0;

        (process.argv.includes("--debug" || "--d")) ? this.debug = true: this.debug = false;
        this.logger = signale;

        this.webhooks = {
            N: new WebhookClient(this.config.webhooks.N.id, this.config.webhooks.N.token),
            V: new WebhookClient(this.config.webhooks.V.id, this.config.webhooks.V.token)
        }

        /** Create handlers for Commands, Listeners (events), and inhibitors */
        this.commandHandler = new CommandHandler(this, {
            directory: join(__dirname, "..", "commands"),
            prefix: this.prefix,
            allowMention: true,
            handleEdits: true,
            commandUtil: true,
            automateCategories: true,
            argumentDefaults: {
                prompt: {
                    timeout: "Time ran out, so I cancelled the command.",
                    ended: "There were too many retries, so I cancelled the command.",
                    cancel: "Command has been cancelled.",
                    retries: 4,
                    time: 100000
                }
            }
        });

        this.listenerHandler = new ListenerHandler(this, {
            directory: join(__dirname, "..", "listeners"),
        });

        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: join(__dirname, "..", "inhibitors"),
        });
    }

    /**
     * Initializes VV.
     * @param {string} token The bot token
     */
    init(token = this.config.token) {
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            inhibitorHandler: this.inhibitorHandler,
            listenerHandler: this.listenerHandler
        });
        
        this.commandHandler.loadAll();
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.commandHandler.useInhibitorHandler(this.inhibitorHandler);

        this.listenerHandler.loadAll();
        this.inhibitorHandler.loadAll();

        return super.login(token);
    }
}