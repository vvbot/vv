import signale from "signale";
import { WebhookClient } from "discord.js";
import { CommandHandler, ListenerHandler, InhibitorHandler } from "discord-akairo";
const { Command } = require("discord-akairo");

export class VVClient {
    config: ConfigObject;
    prefix: string;
    version: string;
    presenceDelay: number;
    github: string;

    oldColor: Color;
    color: Color; 

    fakeToken: string;

    commandsExecuted: number;
    messagesSeen: number;

    debug: boolean;

    logger = signale;

    webhooks = {
        N: WebhookClient
    }

    commandHandler: CommandHandler;
    listenerHandler: ListenerHandler;
    inhibitorHandler: InhibitorHandler;

    init(token: string):null
}

export interface ConfigObject {
    // Bot related
    token: string;
    admins: Array[string];
    prefix: string;
    debug_mode: boolean;

    // Web related
    chewey_bot: string;
    nasa: string;

    //Webhooks
    webhooks: {
        N: {
            id: string,
            token: string
        }
    }
}

export class Command extends Command {
    client: VVClient;
}

type Color =0xFF69B4 | 0xf6ad46;