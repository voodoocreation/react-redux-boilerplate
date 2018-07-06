export default (executor: TPromiseExecutor) =>
  jest.fn(async () => new Promise(executor));
