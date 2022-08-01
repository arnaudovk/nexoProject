const mongoose = require("mongoose");
const { toJSON } = require("./plugins");

const configurationSchema = mongoose.Schema({
  from: {
    type: String,
    required: false,
  },
  to: {
    type: String,
    required: false,
  },
  gas: {
    type: Number,
  },
  value: { type: Number },
  valueAbove: { type: Number },
  valueBelow: { type: Number },
  type: { type: Number },
  current: { type: Boolean, default: false, private: true },
  transactions: [{ type: mongoose.Types.ObjectId, ref: "Transaction" }],
});

configurationSchema.plugin(toJSON);

const Configuration = mongoose.model("Configuration", configurationSchema);

module.exports = Configuration;
