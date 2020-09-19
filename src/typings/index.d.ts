import signale from "signale";
import { WebhookClient } from "discord.js";
import { CommandHandler, ListenerHandler, InhibitorHandler, AkairoClient } from "discord-akairo";

export class VVClient extends AkairoClient {
    public config: ConfigObject;
    public prefix: string;
    public version: string;
    public presenceDelay: number;
    
    public urls: {
        github: string,
        server: string,
        info: string,
        me: string,
    }

    public oldColor: Color;
    public color: Color;

    public fakeToken: string;

    public commandsExecuted: number;
    public messagesSeen: number;

    public debug: boolean;

    public logger = signale;

    public webhooks = {
        N: WebhookClient,
        V: WebhookClient
    };

    public commandHandler: CommandHandler;
    public listenerHandler: ListenerHandler;
    public inhibitorHandler: InhibitorHandler;

    public init(token: string): null;
}

export interface ConfigObject {
    // Bot related
    public token: string;
    public admins: Array[string];
    public prefix: string;
    public debug_mode: boolean;

    // Web related
    public chewey_bot: string;
    public nasa: string;

    // Webhooks
    public webhooks: {
        N: {
            id: string,
            token: string
        },
        V: {
            id: string,
            token: string
        }
    }
}

export interface CreditObject {
    public name: string;
    public url: string;
    public reason: string;
}

type Color = 0xFF69B4|0xf6ad46;

