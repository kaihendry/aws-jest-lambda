"use strict";

const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");
const lambdaClient = new LambdaClient({ region: "ap-southeast-1" });

module.exports.start = async (event) => {
  const params = {
    FunctionName: "hendry-lambda-invoke-test-dev-invokeMEpls",
    Payload: JSON.stringify({ foo: "bar" }),
  };
  const command = new InvokeCommand(params);
  const response = await lambdaClient.send(command);

  console.log("response from calling lambda", {
    payload: new TextDecoder("utf-8").decode(response.Payload),
  });
};

module.exports.invokeme = async (event) => {
  console.log(event);
  return { hello: event };
};
