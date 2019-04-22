"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multiremoteHandler = exports.elementErrorHandler = void 0;

var _refetchElement = _interopRequireDefault(require("./utils/refetchElement"));

var _implicitWait = _interopRequireDefault(require("./utils/implicitWait"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This method is an command wrapper for elements that checks if a command is called
 * that wasn't found on the page and automatically waits for it
 *
 * @param  {Function} fn  commandWrap from wdio-sync package (or shim if not running in sync)
 */
const elementErrorHandler = fn => (commandName, commandFn) => {
  return function (...args) {
    return fn(commandName, async () => {
      const element = await (0, _implicitWait.default)(this, commandName);
      this.elementId = element.elementId;

      try {
        const result = await fn(commandName, commandFn).apply(this, args);
        /**
         * assume Safari responses like { error: 'no such element', message: '', stacktrace: '' }
         * as `stale element reference`
         */

        if (result && result.error === 'no such element') {
          const err = new Error();
          err.name = 'stale element reference';
          throw err;
        }

        return result;
      } catch (error) {
        if (error.name === 'stale element reference') {
          const element = await (0, _refetchElement.default)(this, commandName);
          this.elementId = element.elementId;
          this.parent = element.parent;
          return await fn(commandName, commandFn).apply(this, args);
        }

        throw error;
      }
    }).apply(this);
  };
};
/**
 * handle single command calls from multiremote instances
 */


exports.elementErrorHandler = elementErrorHandler;

const multiremoteHandler = wrapCommand => commandName => {
  return wrapCommand(commandName, function (...args) {
    const commandResults = this.instances.map(instanceName => {
      return this[instanceName][commandName](...args);
    });
    return Promise.all(commandResults);
  });
};

exports.multiremoteHandler = multiremoteHandler;