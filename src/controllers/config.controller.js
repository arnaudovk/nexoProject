const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { configService } = require("../services");
const configurationCache = require("../cache/configurationCache");
const logger = require("../config/logger");

const getConfigurations = catchAsync(async (req, res) => {
  const result = await configService.getConfigurations();
  res.send(result);
});

const createConfiguration = catchAsync(async (req, res) => {
  const config = await configService.createConfiguration(req.body);
  res.status(httpStatus.CREATED).send(config);
});

module.exports = { getConfigurations, createConfiguration };
