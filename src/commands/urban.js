const axios = require("axios");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "urban",
    description: "Searches the urban dictionary for the provided term",
    args: true,
    usage: "",
    nsfw: true,
    async execute(message, args, client) {
        const definition = await axios.get(`https://api.urbandictionary.com/v0/define?term=${args[0]}`);
        const embed = new MessageEmbed()
            .setTitle(`Result for "${args[0]}":`)
            .setDescription(client.shorten(definition.data.list[0].definition, 1000))
            .setAuthor(`${definition.data.list[0].author}`, "https://d2gatte9o95jao.cloudfront.net/assets/apple-touch-icon-1734beeaa059fbc5587bddb3001a0963670c6de8767afb6c67d88d856b0c0dad.png")
            .setURL(definition.data.list[0].permalink)
            .setColor(0xFF69B4);

        return message.channel.send(embed);
    }
}