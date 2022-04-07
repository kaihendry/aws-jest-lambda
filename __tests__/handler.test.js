const handler = require("../handler.js");
const log = require("lambda-log");
const axios = require("axios");
const mockAdapter = require("axios-mock-adapter");

describe("Axios stuff", () => {
  const mock = new mockAdapter(axios);

  it("should output metrics on API failure", async () => {
    const logSpy = jest.spyOn(log, "warn").mockImplementation();

    mock.onAny().reply(500);
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
      data: expect.anything(),
      functionName: expect.anything(),
      hostname: expect.any(String),
      statusCode: 500,
    });
  });
});
