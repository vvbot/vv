const { yellowBright } = require("chalk");

module.exports = (client, message) => {
    client.logger.warn(yellowBright(message));
};