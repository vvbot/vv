const axios = require("axios");

module.exports = {
    name: "domain",
    description: "Checks if the given domain is available to be registered.",
    usage: "[DOMAIN]",
    disabled: true,
    async execute(message, args, client) {
        const { data: data } = await axios.get(`https://domain-availability-api.whoisxmlapi.com/api/v1?apiKey=${client.config.web["domain-api-key"]}&domainName=${args[0]}`);
        
        return message.channel.send(`The domain **${args[0]}** is currently ${data.DomainInfo.domainAvailability.toLowerCase()} for registration.`);
    }
}
