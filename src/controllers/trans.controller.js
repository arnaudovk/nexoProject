const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { configService, transService } = require("../services");
const configurationCache = require("../cache/configurationCache");
const logger = require("../config/logger");
const ApiError = require("../utils/ApiError");
const pick = require("../utils/pick");

const getTransactions = catchAsync(async (req, res) => {
  const options = pick(req.query, ["limit", "page"]);
  const filter = pick(req.query, [
    "hash",
    "_id",
    "configuration",
    "blockHash",
    "blockNumber",
    "from",
    "to",
  ]);
  const result = await transService.getTransactions(filter, options);
  res.send(result);
});

const getTransaction = catchAsync(async (req, res) => {
  const transaction = await transService.getTransaction(req.params.id);
  if (!transaction) {
    throw new ApiError(httpStatus.NOT_FOUND, "Transaction not found");
  }
  res.send(transaction);
});

module.exports = { getTransaction, getTransactions };
