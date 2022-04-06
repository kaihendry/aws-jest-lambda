const { mockClient } = require("aws-sdk-client-mock");
const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");

const lambdaMock = mockClient(LambdaClient);

const handler = require("../handler.js");

describe("Lambda stuff", () => {
  beforeEach(() => {
    lambdaMock.reset();
  });

  it("should invoke another lambda", async () => {
    lambdaMock.on(InvokeCommand).resolves({
      StatusCode: 200,
      Payload: new Uint8Array(
        Buffer.from(JSON.stringify({ body: { verified: true } }))
      ),
    });
    await handler.start();
    // console.log(lambdaMock.call(0));
    expect(lambdaMock.call(0).firstArg.input.FunctionName).toBe(
      "hendry-lambda-invoke-test-dev-invokeMEpls"
    );
  });
});
