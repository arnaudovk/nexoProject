const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");
const logger = require("./config/logger");
const utils = require("./utils/utils");
const ethWatcher = require("./ethWatcher/watcher");
const configurationCache = require("./cache/configurationCache");

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info("Connected to MongoDB");
  server = app.listen(config.port, async () => {
    logger.info(`Listening to port ${config.port}`);
    await utils.setInitialCache();
    if (!configurationCache.isEmpty()) {
      ethWatcher();
    }
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);