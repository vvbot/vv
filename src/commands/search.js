const axios = require("axios");

module.exports = {
    name: "search",
    description: "Search DuckDuckGo for your query",
    aliases: ["ddg", "duckduckgo"],
    cooldown: 10,
    args: true,
    usage: "",
    disabled: true,
    async execute(message, args, client, logger) {
        let text;

        const res = await axios.get(`https://api.duckduckgo.com/?q=?${encodeURIComponent(args.join(" "))}&format=json&no_html=1`);
        logger.info(encodeURIComponent(args.join(" ")))
        if (!res.data) return message.channel.send(`No entries found for search "${args.join(" ")}"`);
        if (res.data.RelatedTopics[0] === void 0) return message.channel.send(`No entries found for search "${args.join(" ")}"`);

        if(res.data.RelatedTopics[0].Text.length > res.data.Abstract.length) text = url.RelatedTopics[0].Text;
        else text = url.Abstract;

        const embed = client.defualtEmbed
            .setTitle(`Results for: ${res.data.Heading}`)
            .setDescription(text)
            .addField("Links:", res.RelatedTopics[0].FirstURL)

        return message.channel.send(embed);
    }
}