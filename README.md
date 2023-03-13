# console-once
An npm package for calling `console.`[`debug` | `log` | `warn` | `info` | `error` | etc] only once. This package works in node and in the browser.

## Example Usage:

### Install it...
```bash
npm install console-once
```

### Import/Require it...
```javascript
import consoleOnce from 'console-once'
```
...or...
```javascript
const consoleOnce = require('console-once')
```

### Use it...
```javascript
// default usage
consoleOnce.log('testKey', 'test');

// pass multiple arguments
consoleOnce.log('testKey', 'test', 'test2', 'test3')

// use any shortcut function
consoleOnce.debug(uniqueKey, arg1, art2, ...etc)
consoleOnce.info(uniqueKey, arg1, art2, ...etc)
consoleOnce.log(uniqueKey, arg1, art2, ...etc)
consoleOnce.warn(uniqueKey, arg1, art2, ...etc)
consoleOnce.error(uniqueKey, arg1, art2, ...etc)
```