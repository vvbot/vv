const { Listener } = require("discord-akairo");
const ReactionMenu = require("@amanda/reactionmenu");

module.exports = class MessageReactionAddListener extends Listener {
    constructor() {
        super("messageReactionAdd", {
            emitter: "client",
            event: "messageReactionAdd"
        });
    }

    async exec(reaction, user) {
        let constructedData = { user_id: user.id, channel_id: reaction.message.channel.id, message_id: reaction.message.id, emoji: { id: reaction._emoji.id, name: reaction._emoji.name }};

        return ReactionMenu.handler(constructedData, reaction.message.channel, user, this.client);
    }
}