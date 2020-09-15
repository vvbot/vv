const { Command, Argument } = require("discord-akairo");

module.exports = class ChanceCommand extends Command {
    constructor() {
        super("chance", {
            aliases: ["chance", "one-in"],
            description: "A game of chance - try to guess the number I've come up with between 1 and 1000.",
            typing: true,
            args: [
                {
                    id: "guess",
                    prompt: {
                        start: "What's your guess?",
                        retry: "That number won't work. Try again."
                    },
                    type: Argument.range('number', 0, 1000),
                    limit: 1
                }
            ]
        });
    }

    exec(msg, { guess }) {
        let actual = Math.floor(Math.random() * 1000) + 1;

        if (actual === guess) return msg.util.send("Correct?! Honestly go buy a lottery ticket or somethin'...");
        else return msg.util.send(`Dang, the answer was actually \`${actual}\`. You lost. Now I steal your bread privileges.`);
    }
}