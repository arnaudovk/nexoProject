const Cache = require("./Cache");

const singletonConfigurationCache = new Cache();
Object.freeze(singletonConfigurationCache);

module.exports = singletonConfigurationCache;
