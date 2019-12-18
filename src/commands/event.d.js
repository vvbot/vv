const { stripIndent } = require("common-tags");

module.exports = {
    name: "event.d",
    description: "Bzzt - EVNT M3 -..##",
    hidden: true,
    
    execute(message, args, client, logger) {
        return message.channel.send(stripIndent`
        {
            [
                "0".
                "<@!!${client.utils.randomRange(19, 77)}>"
            ],
            ..cUT
            [
                "15"
                >!\~~ RGsvRjk2ZFo0dGJwSVZMNkJ5OUtORjV6RjJzM2RzN1k4eDM2QTlxbHRYND0= ~\~
            ]
            end
        }`, { code: "json" });
    }
}