const crypto = require("crypto");
const { readdirSync, statSync } = require("fs");
const { readdir, stat } = require("fs").promises;
const { join } = require("path");
const util = require("util");

const yes = ["yes", "y", "ye", "yeah", "yup", "yea", "ya"];
const no = ["no", "n", "nah", "nope", "nop"];

/**
 * VV's utility class
 */
module.exports = class Utils {
    /**
     * Provide a delay.
     * @param {string} ms A time to wait (in milliseconds)
     */
    static delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Shuffles the given array
     * @param {Array} array Array
     */
    static shuffle(array) {
        const arr = array.slice(0);
        for (let i = arr.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr;
    }

    /**
     * Creates a single string worded like a list based off the given array.
     * @param {Array} arr Array
     * @param {string} separator A character to surround each element with and separate them from other elements.
     * @param {string} conj Conjunction
     */
    static list(arr, separator = "", conj = "and") {
        const len = arr.length;
        return `${separator}${arr.slice(0, -1).join(`${separator}, ${separator}`)}${separator}${len > 1 ? `${len > 2 ? "," : ""} ${conj} ` : ""}${separator}${arr.slice(-1)}${separator}`;
    }

    /**
     * Shorten the supplied text to the given length/
     * @param {string} text Text to shorten
     * @param {Number} maxLen Maximum length of text
     */
    static shorten(text, maxLen = 2000) {
        return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
    }

    /**
     * Returns a random number between the given min and max values
     * @param {Number} min Minimum value
     * @param {Number} max Maximum value
     */
    static randomRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Trims an array to the supplied length
     * @param {Array} arr Array
     * @param {Number} maxLen The maximum length of the array
     */
    static trimArray(arr, maxLen = 10) {
        if (arr.length > maxLen) {
            const len = arr.length - maxLen;
            arr = arr.slice(0, maxLen);
            arr.push(`${len} more...`);
        }
        return arr;
    }

    /**
     * Capitalize the first letter of a string
     * @param {string} text Text
     * @param {string} split String to split the given text by
     */
    static capitalize(text, split = " ") {
        return text.split(split).map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(" ");
    }

    /**
     * Format a number
     * @param {Number} number Number
     */
    static formatNumber(number) {
        return Number.parseFloat(number).toLocaleString(undefined, {
            maximumFractionDigits: 2
        });
    }

    /**
     * Capitalizes random letters of the given string
     * @param {string} text Text
     */
    static randCap(text) {
        return text.split("").map(function (v) {
            return v = Math.round(Math.random()) ? v.toUpperCase() : v.toLowerCase();
        }).join("");
    }

    /**
     * Helper method to encode and decode Base64
     * @param {string} text Text
     * @param {string} mode The mode under which to operate (either "encode" or "decode")
     */
    static base64(text, mode = "encode") {
        if (mode === "encode") return Buffer.from(text).toString("base64");
        if (mode === "decode") return Buffer.from(text, "base64").toString("utf8") || null;
        throw new TypeError(`${mode} is not a supported base64 mode.`);
    }

    static async verify(channel, user, time = 30000) {
        const filter = res => {
            const value = res.content.toLowerCase();
            return res.author.id === user.id && (yes.includes(value) || no.includes(value));
        }
        const verify = await channel.awaitMessages(filter, {
            max: 1,
            time
        });
        if (!verify.size) return 0;
        const choice = verify.first().content.toLowerCase();
        if (yes.includes(choice)) return true;
        if (no.includes(choice)) return false;
        return false;
    }

    /**
     * Helper method to hash text
     * @param {text} text Text
     * @param {text} algorithm Algorithm
     */
    static hash(text, algorithm) {
        return crypto.createHash(algorithm).update(text).digest("hex");
    }

    /**
     * Helper method to return the current date and time
     * @param {string} timeZone timezone
     */
    static today(timeZone) {
        const now = new Date();
        if (timeZone) now.setUTCHours(timeZone);
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);
        now.setMilliseconds(0);
        return now;
    }

    /**
     * Helper method to return tomorrows time and date.
     * @param {string} timeZone Timezone
     */
    static tomorrow(timeZone) {
        const today = Util.today(timeZone);
        today.setDate(today.getDate() + 1);
        return today;
    }

    /**
     * Selects and returns a random item from the given array.
     * @property {Array} array The array to select the random item from
     */
    static randomItem(array) {
        return array[~~(array.length * Math.random())];
    }

    /**
     * Humanizes the bot's uptime
     * @returns {object} An object containing a formatted time-string and a humanized time string
     */
    static uptime() {
        let msec = Number(process.uptime().toFixed(0)) * 1000;
        let days = Math.floor(msec / 1000 / 60 / 60 / 24);
        msec -= days * 1000 * 60 * 60 * 24;
        let hours = Math.floor(msec / 1000 / 60 / 60);
        msec -= hours * 1000 * 60 * 60;
        let mins = Math.floor(msec / 1000 / 60);
        msec -= mins * 1000 * 60;
        let secs = Math.floor(msec / 1000);

        let timestr = {
            formatted: "",
            humanized: ""
        };

        if (days > 0) {
            timestr.humanized += days + " days ";
            timestr.formatted += days + "d ";
        }
        if (hours > 0) {
            timestr.humanized += hours + " hours ";
            timestr.formatted += hours + "h ";
        }
        if (mins > 0) {
            timestr.humanized += mins + " minutes ";
            timestr.formatted += mins + "m ";
        }
        if (secs > 0) {
            timestr.humanized += secs + " seconds";
            timestr.formatted += secs + "s ";
        }

        return timestr;
    }

    /**
     * Finds a member from a string, mention, or id
     * @property {string} msg The message to process
     * @property {string} suffix The username to search for
     * @property {bool} self Whether or not to default to yourself if no results are returned. Defaults to false.
     */
    static findMember(msg, suffix, self = false) {
        if (!suffix) {
            if (self) return msg.member;
            else return null;
        } else {
            let member = msg.mentions.members.first() || msg.guild.members.cache.get(suffix) || msg.guild.members.cache.find(m => m.displayName.toLowerCase().includes(suffix.toLowerCase()) || m.user.username.toLowerCase().includes(suffix.toLowerCase()));
            
            //If we can't find a member AND you actually want to find yourself...
            if(!member && self) return msg.member;
            else return member;
        }
    }

    /**
     * Scrapes a supplied directory and returns recursive directories and files within.
     * @param {File Path} srcPath The directory to scrape.
     */
    static getDirectoriesSync(srcPath) {
        return readdirSync(srcPath).filter(file => statSync(join(srcPath, file)).isDirectory());
    }

    /**
     * Asynchronously scrapes the supplied directory and recursively returns directories within.
     * @param {string} srcPath The directory to scrape.
     */
    static async getDirectories(srcPath) {
        let files = await readdir(srcPath);

        return files.filter(async file => {
            let s = await stat(join(srcPath, file));
            s.isDirectory();
        });
    }

    static disambiguation(items, label, property = 'name') {
        const itemList = items.map(item => `"${(property ? item[property] : item).replace(/ /g, '\xa0')}"`).join(',   ');
        return `Multiple ${label} found, please be more specific: ${itemList}`;
    }

    /**
     * @param {any} data
     * @param {number} [depth=0]
     * @returns {Promise<string>}
     * @author PapiOphidian
     * Thanks Papi!
     */
    static async stringify(data, depth = 0) {
        let result;
        
        if (data === undefined) result = "(undefined)"
        else if (data === null) result = "(null)"
        else if (typeof (data) == "function") result = "(function)"
        else if (typeof (data) == "string") result = `"${data}"`
        else if (typeof (data) == "number") result = data.toString()
        else if (data instanceof Promise) return Utils.stringify(await data, depth)
        else if (data.constructor && data.constructor.name && data.constructor.name.toLowerCase().includes("error")) {
            const errorObject = {};

            Object.entries(data).forEach(e => {
                errorObject[e[0]] = e[1];
            });

            result = `\`\`\`\n${data.stack}\`\`\` ${await Utils.stringify(errorObject)}`;
        } else result = `\`\`\`js\n${util.inspect(data, { depth: depth })}\`\`\``;

        if (result.length >= 2000) {
            if (result.startsWith("```")) result = `${result.slice(0, 1995).replace(/`+$/, "").replace(/\n\s+/ms, "")}…\`\`\``;
		    else result = `${result.slice(0, 1998)}…`;
        }
        
	    return result;
    }
}