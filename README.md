# Goal: Test Javascript like [gotestaws](https://github.com/kaihendry/gotestaws)

- Mock AWS calls
- Assert their parameters are correct
- Simulate their responses to ensure the logic using them are handling them as expected
- TODO: Simulate exception handling

## Current issue

The `mock.calls[0][0]` method of asserting params feels a little wrong.

- https://stackoverflow.com/q/71735120
- https://github.com/dwyl/aws-sdk-mock/issues/268

## Switch to AWS JS SDK v3

https://twitter.com/radzikowski_m/status/1510967905411899395

Big con of this approach is that the existing code base would have to be refactored.

Switching from the established
[aws-sdk-mock](https://github.com/dwyl/aws-sdk-mock) to the new
[aws-sdk-client-mock](https://github.com/m-radzikowski/aws-sdk-client-mock).

- https://www.npmtrends.com/aws-sdk-mock-vs-aws-sdk-client-mock
