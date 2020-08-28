const { magenta, blue, grey } = require("chalk");
const { version, dependencies } = require("../../package.json");

module.exports = async (client) => {
    client.logger.info(`${magenta(client.user.username)} is online`);
    client.logger.info(`Prefix set to ${magenta(client.prefix)}`);
    client.logger.info(`${magenta(client.commands.size)} commands loaded`);
    client.logger.info(`Program Version: ${blue("v" + version)}`);
    client.logger.info(`Node Version: ${blue(process.version)}`);
    client.logger.info(`Discord.js Version ${blue(dependencies["discord.js"].replace("^", "v"))}`);

    if (client.debug) client.logger.info(grey("Started in DEBUG MODE"));

    await client.user.setActivity({
        name: "with Axel",
        type: 0
    });

    setInterval(() => {
        let activity = client._presence.random();
        client.user.setActivity({
            name: `${activity.title}`,
            type: activity.type
        });
    }, 300000);
};