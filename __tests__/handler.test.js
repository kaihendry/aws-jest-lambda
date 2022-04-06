const AWS = require("aws-sdk-mock");
const handler = require("../handler.js");

describe("Lambda stuff", () => {
  const lambdaSpy = jest.fn();
  beforeEach(() => {
    lambdaSpy.mockResolvedValue("mock ok");
    AWS.mock("Lambda", "invoke", lambdaSpy);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should invoke another lambda", async () => {
    await handler.start();
    expect(lambdaSpy.mock.calls[0][0].FunctionName).toBe(
      "hendry-lambda-invoke-test-dev-invokeMEpls"
    );
    expect(lambdaSpy.mock.calls[0][0].Payload).toBe('{"foo":"bar"}');
  });
});
