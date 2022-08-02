const logger = require("../config/logger");
const { filterTransactions } = require("../utils/filterTransactions");
const { Transaction } = require("../models");

const handleTransactions = async (array, blockNumber) => {
  const filteredTransactions = filterTransactions(array);
  if (filteredTransactions.length) {
    Transaction.insertMany(filteredTransactions);
    // If we need to store each thHash in the configuration
    // .then(async (result) => {
    //   const curr = await Configuration.findById(configurationCache.getId());
    //   curr.transactions = curr.transactions.concat(result);
    //   await curr.save();
    // });
  }
  logger.info(
    `${filteredTransactions.length} transactions from block ${blockNumber} saved. `
  );
};

const getTransactions = async (filter, options) => {
  return Transaction.paginate(filter, options);
};

const getTransaction = async (id) => {
  return Transaction.findById(id);
};

module.exports = {
  filterTransactions,
  handleTransactions,
  getTransactions,
  getTransaction,
};
