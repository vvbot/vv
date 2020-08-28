const { exec } = require("child_process");

module.exports = {
    name: "exec",
    description: "Load a file within the commands folder.",
    args: false,
    usage: "[COMMAND]",
    adminOnly: true,
    preventDefaultError: true,
    execute(message, args, client) {
        try {
            const cmd = args.join(" ");
            exec(`${cmd}`, (error, stdout, stderr) => {
                if(error || stderr) return error ?? stderr;
                return message.channel.send(client.clean(stdout), { code: "xl", split: true })
            })
        } catch (error) {
            throw error.message;
        }
    },
    async error(message, args, client, error) {
        return message.channel.send(`\`ERROR\` \`\`\`xl\n${client.clean(error)}\n\`\`\``)
    }
}