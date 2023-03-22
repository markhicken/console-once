const consoleOnce = require('../src/index');
const {debug, info, log, warn, error} = consoleOnce;

function assertTestsByFn(fn) {
  const fnName = fn['fnName'] || fn.name;
  const spyFnName = fnName === 'consoleOnce' ? 'log' : fnName;
  // if a console shortcut function is used, the
  // consoleOnce function signature is different!
  const baseArgs = fnName === 'consoleOnce' ? [spyFnName, 'testKey'] : ['testKey'];

  describe(fnName, () => {
    const console = global?.console || window?.console;
    afterEach(()=>{
      consoleOnce.callKeys.clear();
      jest.restoreAllMocks();
    });

    test('calls the function only once', () => {
      jest.spyOn(console, spyFnName);
      fn(...[...baseArgs, 'test']);
      fn(...[...baseArgs, 'test2']);
      expect(console[spyFnName]).toHaveBeenCalledTimes(1);
    });

    test('calls the expected function with 1 argument', () => {
      jest.spyOn(console, spyFnName);
      fn(...[...baseArgs, 'test']);
      expect(console[spyFnName]).toHaveBeenCalledWith('test');
    });

    test('calls the expected function with more than 1 argument', () => {
      jest.spyOn(console, spyFnName);
      fn(...[...baseArgs, 'test', 'test2', 'test3']);
      expect(console[spyFnName]).toHaveBeenCalledWith('test', 'test2', 'test3');
    });
  });
}

describe('consoleOnce functions', () => {
  assertTestsByFn(consoleOnce);
  assertTestsByFn(consoleOnce.debug);
  assertTestsByFn(consoleOnce.info);
  assertTestsByFn(consoleOnce.log);
  assertTestsByFn(consoleOnce.warn);
  assertTestsByFn(consoleOnce.error);
});