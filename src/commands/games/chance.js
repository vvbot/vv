module.exports = {
    name: "chance",
    description: "A guessing game with 1/1000 chance of winning.",
    aliases: ["one-in"],
    args: true,
    execute(message, args, client) {
        let actual = Math.floor(Math.random() * 1000) + 1;

        console.log(actual, args[0])

        if (actual == Number(args[0])) return message.channel.send("Correct?! Honestly go buy a lottery ticket or somethin...");
        else return message.channel.send(`Dang, the answer was actually ${actual}. You lost. Now I steal your bread privileges.`);
    }
}