const { Command } = require("discord-akairo");
const { readFile, writeFile } = require("fs").promises;
const { join } = require("path");

const { capitalize } = require("../../util/utils");

module.exports = class GenerateCommandsCommand extends Command {
    constructor() {
        super("generate-readme", {
            aliases: ["gen-readme", "gen-rdme"],
            description: "Generates the information found in my README.",
            ownerOnly: true,
            typing: true,
            args: [
                {
                    id: "readme",
                    match: "flag",
                    flag: "--append"
                }
            ]
        });
    }

    async exec(msg, { readme }) {
        let list = this.client.commandHandler.categories.map(c => {
            let commands = c.filter(c => !c.hidden);
            return `\n### ${capitalize(c.id)}:\n\n${commands.map(cmd => {
                    let extra = `${cmd.ownerOnly ? " (Owner-Only)" : ""}${cmd.nsfw ? " (NSFW)" : ""}`;
                    return `* **${cmd.id}:** ${cmd.description}${extra}`;
                }).join("\n")}`;
        });

        let text = `## General Information\n\nCurrent Prefixes: \`${this.client.prefix}\`, mentions\n\nTotal Commands: ${this.client.commandHandler.modules.size}\n\nWebsite: ${this.client.urls.info}\n\n## Available Commands\n${list.join("\n")}`;

        if(!readme) {
            return msg.util.send("Successfully generated `commands.txt`.", {
                files: [{
                    attachment: Buffer.from(text),
                    name: "commands.txt"
                }]
            });
        } else if(readme) {
            let base = await readFile(join(__dirname, "..", "..", "..", "Base README.md"), { encoding: "utf-8" });

            let readme = await writeFile(join(__dirname, "..", "..", "..", "README.md"), `${base}\n\n${text}`, { encoding: "utf-8"})

            await msg.util.send("Successfully wrote to `README.md`.")
        }
    }
};