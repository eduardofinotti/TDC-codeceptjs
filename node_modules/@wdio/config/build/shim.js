"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasWdioSyncSupport = exports.wrapCommand = exports.runFnInFiberContext = exports.runTestInFiberContext = exports.executeHooksWithArgs = void 0;

var _logger = _interopRequireDefault(require("@wdio/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const log = (0, _logger.default)('@wdio/config');

const NOOP = () => {};

let executeHooksWithArgs = async function executeHooksWithArgsShim(hooks, args) {
  /**
   * make sure hooks are an array of functions
   */
  if (!Array.isArray(hooks)) {
    hooks = [hooks];
  }
  /**
   * make sure args is an array since we are calling apply
   */


  if (!Array.isArray(args)) {
    args = [args];
  }

  hooks = hooks.map(hook => new Promise(resolve => {
    let result;

    try {
      result = hook.apply(null, args);
    } catch (e) {
      log.error(e.stack);
      return resolve();
    }
    /**
     * if a promise is returned make sure we don't have a catch handler
     * so in case of a rejection it won't cause the hook to fail
     */


    if (result && typeof result.then === 'function') {
      return result.then(resolve, e => {
        log.error(e.stack);
        resolve();
      });
    }

    resolve(result);
  }));
  return Promise.all(hooks);
};

exports.executeHooksWithArgs = executeHooksWithArgs;
let runTestInFiberContext = NOOP;
exports.runTestInFiberContext = runTestInFiberContext;

let runFnInFiberContext = fn => {
  return function (...args) {
    return Promise.resolve(fn.apply(this, args));
  };
};

exports.runFnInFiberContext = runFnInFiberContext;

let wrapCommand = (_, origFn) => origFn;

exports.wrapCommand = wrapCommand;
let hasWdioSyncSupport = false;
/**
 * shim to make sure that we only wrap commands if wdio-sync is installed as dependency
 */

exports.hasWdioSyncSupport = hasWdioSyncSupport;

try {
  // eslint-disable-next-line import/no-unresolved
  const wdioSync = require('@wdio/sync');

  exports.hasWdioSyncSupport = hasWdioSyncSupport = true;
  exports.runFnInFiberContext = runFnInFiberContext = wdioSync.runFnInFiberContext;
  exports.runTestInFiberContext = runTestInFiberContext = wdioSync.runTestInFiberContext;
  exports.wrapCommand = wrapCommand = wdioSync.wrapCommand;
  exports.executeHooksWithArgs = executeHooksWithArgs = wdioSync.executeHooksWithArgs;
} catch (_unused) {// do nothing
}