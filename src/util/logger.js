const winston = require("winston");
const { join } = require("path");

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: join(__dirname, "..", "..", "log.txt")
        })
    ],
    format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`)
});

module.exports = logger;