const { Configuration } = require("../models");
const configurationCache = require("../cache/configurationCache");
const logger = require("../config/logger");

const getConfigurations = async (filter, options) => {
  return Configuration.paginate(filter, options);
};

const getConfiguration = async (id) => {
  return Configuration.findById(id);
};

const createConfiguration = async (body) => {
  await Configuration.findOneAndUpdate({ current: true }, { current: false });
  const newConfig = await Configuration.create({ ...body, current: true });
  configurationCache.setCacheData(body);
  configurationCache.setId(newConfig.id);
  logger.info(
    `Configuration changed to: ${JSON.stringify(
      configurationCache.getCacheData()
    )}`
  );

  return newConfig;
};

module.exports = {
  getConfigurations,
  createConfiguration,
  getConfiguration,
};
