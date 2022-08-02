const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

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
  // If we need to store each thHash in the configuration
  // transactions: [
  //   {
  //     hash: { type: String, ref: "Transaction" },
  //   },
  // ],
});

configurationSchema.plugin(toJSON);
configurationSchema.plugin(paginate);

const Configuration = mongoose.model("Configuration", configurationSchema);

module.exports = Configuration;
