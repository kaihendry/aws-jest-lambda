"use strict";
const axios = require("axios");
const middy = require("@middy/core");

function errorLoggerMiddleware() {
  const errorLoggerMiddlewareOnError = async (request) => {
    console.warn("context", request?.context);
    console.warn(request.error.toJSON());
    if (request.error.response) {
      console.error("axios error", {
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

const start = middy(baseHandler).use(
  errorLoggerMiddleware()
  // errorLoggerMiddleware({ awsContext: true })
);
module.exports = {
  start,
};
