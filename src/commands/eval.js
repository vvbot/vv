const { join } = require("path");

module.exports = {
    name: "eval",
    description: "Load a file within the commands folder.",
    args: false,
    usage: "",
    cooldown: 5,
    adminOnly: true,
    preventDefualtError: true,
    execute(message, args, client, logger, Discord) {
        try {
            const code = args.join(" ");
            let evaled = eval(code);

            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

            
            return message.channel.send(client.clean(evaled), { code: "xl", split: true });
        } catch(err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${client.clean(err)}\n\`\`\``);
        }
    }
}