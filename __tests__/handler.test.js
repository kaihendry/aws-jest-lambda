const handler = require("../handler.js");
const log = require("lambda-log");
const axios = require("axios");
const mockAdapter = require("axios-mock-adapter");

describe("Axios stuff", () => {
  const mock = new mockAdapter(axios);

  it("should output metrics on API failure", async () => {
    // we need to mock the logger to see if metrics have been emitted
    const logSpy = jest.spyOn(log, "warn").mockImplementation();

    // lets pretend there was a failure that returns "some error" data
    mock.onAny().reply(500, "some error");

    await expect(handler.start()).rejects.toThrow(
      "Request failed with status code 500"
    );

    expect(logSpy).toBeCalledWith("axios error", {
      _aws: {
        Timestamp: expect.any(Number),
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
      data: "some error",
      hostname: expect.any(String),
      statusCode: 500,
    });
  });
});
