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
    Transaction.insertMany(filteredTransactions).then(async (result) => {
      const curr = await Configuration.findById(configurationCache.getId());
      result.forEach((transaction) => {
        const obj = { id: transaction.id, hash: transaction.hash };
        curr.transactions.push(obj);
      });
      await curr.save();
    });
  }
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
