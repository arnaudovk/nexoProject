const httpStatus = require("http-status");
const { Configuration } = require("../models");
const ApiError = require("../utils/ApiError");
const configurationCache = require("../cache/configurationCache");
const logger = require("../config/logger");

const getConfigurations = async () => {
  const res = await Configuration.find({});
  return res;
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

module.exports = { getConfigurations, createConfiguration };
