"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = debug;

var _serializeError = _interopRequireDefault(require("serialize-error"));

var _repl = _interopRequireDefault(require("@wdio/repl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function debug(commandTimeout = 5000) {
  const repl = new _repl.default();
  const {
    introMessage
  } = _repl.default;
  /**
   * run repl in standalone mode
   */

  if (!process.env.WDIO_WORKER) {
    // eslint-disable-next-line
    console.log(_repl.default.introMessage);
    const context = {
      browser: this,
      driver: this,
      $: this.$.bind(this),
      $$: this.$$.bind(this)
    };
    return repl.start(context);
  }
  /**
   * register worker process as debugger target
   */


  process._debugProcess(process.pid);
  /**
   * initialise repl in testrunner
   */


  process.send({
    origin: 'debugger',
    name: 'start',
    params: {
      commandTimeout,
      introMessage
    }
  });

  let commandResolve =
  /* istanbul ignore next */
  () => {};

  process.on('message', m => {
    if (m.origin !== 'debugger') {
      return;
    }

    if (m.name === 'stop') {
      process._debugEnd(process.pid);

      return commandResolve();
    }
    /* istanbul ignore if */


    if (m.name === 'eval') {
      repl.eval(m.content.cmd, global, null, (e, result) => {
        if (e) {
          process.send({
            origin: 'debugger',
            name: 'result',
            params: _objectSpread({
              error: true
            }, (0, _serializeError.default)(e))
          });
        }
        /**
         * try to do some smart serializations
         */


        if (typeof result === 'function') {
          result = `[Function: ${result.name}]`;
        }

        process.send({
          origin: 'debugger',
          name: 'result',
          params: {
            result
          }
        });
      });
    }
  });
  return new Promise(resolve => commandResolve = resolve);
}