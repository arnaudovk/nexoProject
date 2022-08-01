const configurationCache = require("../cache/configurationCache");
const web3 = require("web3");
const logger = require("../config/logger");
const { filterTransactions } = require("../utils/filterTransactions");
const { Transaction, Configuration } = require("../models");

const handleTransactions = async (array) => {
  const filteredTransactions = filterTransactions(array);
  logger.info(
    `Transactions matching configuration: ${filteredTransactions.length}`
  );
  if (filteredTransactions.length) {
    await Transaction.insertMany(filteredTransactions);
  }
};

module.exports = { filterTransactions, handleTransactions };
