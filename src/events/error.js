const { redBright } = require("chalk");

module.exports = (client, error) => {
    client.logger.error(redBright(error));
};