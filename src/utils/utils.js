const { Configuration } = require("../models");
const configurationCache = require("../cache/configurationCache");
const logger = require("../config/logger");
const watchEth = require("../ethWatcher/watcher");

const setInitialCache = async () => {
  const currConfig = await Configuration.findOne({ current: true });
  if (currConfig) {
    const { id, transactions, ...currConfigWithoutId } = currConfig.toJSON();
    configurationCache.setCacheData(currConfigWithoutId);
    configurationCache.setId(currConfig.id);
    logger.info(
      `Current config loaded: ${JSON.stringify(currConfigWithoutId)}`
    );
  } else {
    logger.error("No configuration set!");
    logger.error(
      "Please set configuration to begin watching for transactions!"
    );
  }
};

const checkForConfiguration = function (req, res, next) {
  if (!configurationCache.isEmpty()) {
    if (configurationCache.getIsFirstRequest() === true) {
      configurationCache.setIsFirstRequest(false);
      watchEth();
    }
  }
};

module.exports = { setInitialCache, checkForConfiguration };
