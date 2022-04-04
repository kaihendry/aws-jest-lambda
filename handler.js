"use strict";

const AWS = require("aws-sdk");

module.exports.start = async (event) => {
  const lambda = new AWS.Lambda();
  const resp = await lambda
    .invoke({
      FunctionName: "hendry-lambda-invoke-test-dev-invokeMEpls",
      Payload: JSON.stringify({ foo: "bar" }),
    })
    .promise();
  console.log("response from calling lambda", resp);
};

module.exports.invokeme = async (event) => {
  console.log(event);
  return { hello: "world" };
};
