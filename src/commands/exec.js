const { exec } = require("child_process");

module.exports = {
    name: "exec",
    description: "Load a file within the commands folder.",
    args: false,
    usage: "",
    cooldown: 5,
    adminOnly: true,
    preventDefualtError: true,
    execute(message, args, client, logger, Discord) {
        try {
            const cmd = args.join(" ");
            exec(`${cmd}`, (error, stdout, stderr) => {
                if(error) return error;
                return message.channel.send(client.clean(stdout), { split: true })
            })
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${client.clean(err)}\n\`\`\``);
        }
    }
}