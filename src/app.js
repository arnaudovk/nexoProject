const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const httpStatus = require("http-status");
const routes = require("./routes");
const ApiError = require("./utils/ApiError");
const { errorConverter, errorHandler } = require("./middlewares/error");
const config = require("./config/config");
const morgan = require("./config/morgan");
const utils = require("./utils/utils");

const app = express();

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options("*", cors());

app.use(utils.checkForConfiguration);

app.use("/", routes);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
