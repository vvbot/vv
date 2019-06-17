const axios = require("axios");

module.exports = {
    name: "tld",
    description: "Checks whether the given TLD is real or not",
    args: true,
    usage: "[TLD]",
    aliases: ["gtld"],
    async execute(message, args, client, logger) {
        args = args[0].toUpperCase().replace(".", "");
        let tlds = await axios.get("https://data.iana.org/TLD/tlds-alpha-by-domain.txt");
        tlds = tlds.data.split(/\r?\n/g);
        if(tlds.includes(args)) return message.channel.send(`\`.${args.toLowerCase()}\` is a TLD.`);
        else return message.channel.send(`\`.${args.toLowerCase()}\` is not a TLD.`);
    }
}
