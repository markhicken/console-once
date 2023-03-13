const consoleOnce = require('./index');
const {debug, info, log, warn, error} = consoleOnce;

function assertTestsByFn(fn) {
  const fnName = fn['fnName'] || fn.name;
  describe(fnName, () => {
    const console = global?.console || window?.console;
    afterEach(()=>{
      consoleOnce.callKeys.clear();
      jest.restoreAllMocks();
    });

    test('calls the function only once', () => {
      if (fnName === 'consoleOnce') {
        jest.spyOn(console, 'log');
        fn('log', 'testKey', 'test');
        fn('log', 'testKey', 'test2');
        expect(console['log']).toHaveBeenCalledTimes(1);
      } else {
        jest.spyOn(console, fnName);
        fn('testKey', 'test');
        fn('testKey', 'test2');
        expect(console[fnName]).toHaveBeenCalledTimes(1);
      }
    });

    test('calls the expected function with 1 argument', () => {
      fnName === 'consoleOnce' ?
        jest.spyOn(console, 'log'):
        jest.spyOn(console, fnName);
      fnName === 'consoleOnce' ?
        fn('log', 'testKey', 'test'):
        fn('testKey', 'test');
      fnName === 'consoleOnce' ?
        expect(console['log']).toHaveBeenCalledWith('test'):
        expect(console[fnName]).toHaveBeenCalledWith('test');
    });

    test('calls the expected function with more than 1 argument', () => {
      fnName === 'consoleOnce' ?
        jest.spyOn(console, 'log'):
        jest.spyOn(console, fnName);
      fnName === 'consoleOnce' ?
        fn('log', 'testKey', 'test', 'test2', 'test3'):
        fn('testKey', 'test', 'test2', 'test3');
      fnName === 'consoleOnce' ?
        expect(console['log']).toHaveBeenCalledWith('test', 'test2', 'test3'):
        expect(console[fnName]).toHaveBeenCalledWith('test', 'test2', 'test3');
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