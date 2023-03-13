/**
 * calls console?.[consoleFn] with arguments only once per key.
 * It assumes that console is in scope (on window or global)
 *
 * @param {string} key - unique key for these arguments
 * @param {string} consoleFn - 'debug' | 'info' | 'log' | 'warn' | 'error'
 * @param {*} arguments - arguments to pass to consoleFn
 */
function consoleOnce(fnName, key, ...args) {
  const uniqueFnKey = fnName + '_' + key;
  if (!consoleOnce.callKeys.has(uniqueFnKey)) {
    console?.[fnName](...args);
    consoleOnce.callKeys.add(uniqueFnKey);
  }
}
consoleOnce.callKeys = new Set();

// create consoleOnce.debugOnce, consoleOnce.infoOnce, etc.
['debug', 'info', 'log', 'warn', 'error'].forEach(fnName => {
  consoleOnce[fnName] = function(key, ...args) {
    consoleOnce(fnName, key, ...args);
  };
  consoleOnce[fnName].fnName = fnName;
});

module.exports = consoleOnce;