const { RichEmbed } = require("discord.js");

class RicherEmbed extends RichEmbed {
    constructor(options) {
        super(options)
    }

    /**
     * Adds two fields to the embed: Color and Author.
     */
    fix () {
        this.setColor("RANDOM");
        this.setAuthor("sh0dan", "https://cdn.discordapp.com/avatars/378909180666314754/33133573e3f7269da18f004754593a3b.png");
        return this;
    }
}

module.exports = RicherEmbed;