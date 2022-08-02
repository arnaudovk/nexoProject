const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { configService } = require("../services");
const utils = require("../utils/utils");
const pick = require("../utils/pick");

const getConfigurations = catchAsync(async (req, res) => {
  const options = pick(req.query, ["limit", "page"]);
  const filter = pick(req.query, ["current"]);
  const config = await configService.getConfigurations(filter, options);
  res.send(config);
});

const getConfiguration = catchAsync(async (req, res) => {
  const config = await configService.getConfiguration(req.params.id);
  if (!config) {
    throw new ApiError(httpStatus.NOT_FOUND, "Configuration not found");
  }
  res.send(config);
});

const createConfiguration = catchAsync(async (req, res) => {
  const config = await configService.createConfiguration(req.body);
  res.status(httpStatus.CREATED).send(config);
  res.on("finish", utils.checkForConfiguration);
});

module.exports = {
  getConfigurations,
  createConfiguration,
  getConfiguration,
};
