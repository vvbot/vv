module.exports = {
    name: "eval",
    description: "Load a file within the commands folder",
    args: false,
    usage: "[CODE]",
    cooldown: 5,
    adminOnly: true,
    preventDefaultError: true,
    async execute(message, args, client, logger, Discord) {
        try {
            const code = args.join(" ");
            let evaled = await eval(code);

            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
            
            return message.channel.send(client.clean(evaled), { code: "js", split: true });
        } catch(err) {
            return message.channel.send(`\`ERROR\` \`\`\`xl\n${client.clean(err)}\n\`\`\``);
        }
    }
}