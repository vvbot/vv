const { grey } = require("chalk");

module.exports = (client, message) => {
    client.logger.debug(grey(message));
};