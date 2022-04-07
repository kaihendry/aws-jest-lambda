"use strict";
const axios = require("axios");
const middy = require("@middy/core");
const log = require("lambda-log");

function errorLoggerMiddleware() {
  const errorLoggerMiddlewareOnError = async (request) => {
    //console.error(request.error);
    if (request.error.response) {
      log.warn("axios error", {
        statusCode: request.error.response.status,
        data: request.error.response.data,
        functionName: request?.context.functionName,
        hostname: new URL(request.error.config.url).hostname,
        _aws: {
          Timestamp: new Date().getTime(),
          CloudWatchMetrics: [
            {
              Namespace: "backend",
              Dimensions: [["hostname", "functionName"]],
              Metrics: [
                {
                  Name: "statusCode",
                },
              ],
            },
          ],
        },
      });
    }
  };
  return {
    onError: errorLoggerMiddlewareOnError,
  };
}

const baseHandler = async (event) => {
  resp = await axios.get("https://httpstat.us/404");
  return { resp };
};

const start = middy(baseHandler).use(errorLoggerMiddleware());
module.exports = {
  start,
};
