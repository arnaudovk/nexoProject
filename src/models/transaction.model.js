const mongoose = require("mongoose");
const { toJSON } = require("./plugins");

const transactionSchema = mongoose.Schema({
  blockHash: {
    type: String,
    required: true,
  },
  blockNumber: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  gas: {
    type: String,
    required: true,
  },
  gasPrice: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  input: {
    type: String,
    required: true,
  },
  nonce: {
    type: String,
    required: true,
  },
  r: {
    type: String,
    required: true,
  },
  s: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: false,
  },
  transactionIndex: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  v: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  configuration: { type: mongoose.Types.ObjectId, ref: "Configuration" },
});

transactionSchema.plugin(toJSON);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
