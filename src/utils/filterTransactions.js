const configurationCache = require("../cache/configurationCache");
const web3 = require("web3");

const filterTransactions = (array) => {
  const arr = [];
  const arrForConfig = [];
  array.forEach((transaction) => {
    let matches = true;
    Object.keys(configurationCache.getCacheData()).forEach((key) => {
      if (!matches) {
        return;
      }
      switch (key) {
        case "value":
          const trValue = web3.utils.fromWei(transaction[key]);
          const configValue = configurationCache.getValue(key).toString();
          matches = trValue === configValue;
          break;
        case "valueAbove":
          matches =
            web3.utils.fromWei(transaction["value"]) >
            configurationCache.getValue(key).toString();
          break;
        case "valueBelow":
          matches =
            web3.utils.fromWei(transaction["value"]) <
            configurationCache.getValue(key).toString();
          break;
        case "type":
          const type = web3.utils.hexToNumber(transaction[key]);
          const typeCache = configurationCache.getValue(key);
          matches = type === typeCache;
          break;
        case "from":
          matches = transaction[key] === configurationCache.getValue(key);
          break;
        case "to":
          matches = transaction[key] === configurationCache.getValue(key);
          break;
        case "gas":
          matches =
            web3.utils.hexToNumber(transaction[key]) ===
            configurationCache.getValue(key);
          break;

        default:
          break;
      }
    });
    if (matches) {
      transaction.configuration = configurationCache.getId();
      arr.push(transaction);
      arrForConfig.push(transaction.hash);
    }
  });
  console.log(arrForConfig);
  return arr;
};

module.exports = { filterTransactions };
