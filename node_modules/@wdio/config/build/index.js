"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ConfigParser", {
  enumerable: true,
  get: function () {
    return _ConfigParser.default;
  }
});
Object.defineProperty(exports, "validateConfig", {
  enumerable: true,
  get: function () {
    return _utils.validateConfig;
  }
});
Object.defineProperty(exports, "getSauceEndpoint", {
  enumerable: true,
  get: function () {
    return _utils.getSauceEndpoint;
  }
});
Object.defineProperty(exports, "detectBackend", {
  enumerable: true,
  get: function () {
    return _utils.detectBackend;
  }
});
Object.defineProperty(exports, "wrapCommand", {
  enumerable: true,
  get: function () {
    return _shim.wrapCommand;
  }
});
Object.defineProperty(exports, "runFnInFiberContext", {
  enumerable: true,
  get: function () {
    return _shim.runFnInFiberContext;
  }
});
Object.defineProperty(exports, "runTestInFiberContext", {
  enumerable: true,
  get: function () {
    return _shim.runTestInFiberContext;
  }
});
Object.defineProperty(exports, "executeHooksWithArgs", {
  enumerable: true,
  get: function () {
    return _shim.executeHooksWithArgs;
  }
});
Object.defineProperty(exports, "hasWdioSyncSupport", {
  enumerable: true,
  get: function () {
    return _shim.hasWdioSyncSupport;
  }
});
Object.defineProperty(exports, "DEFAULT_CONFIGS", {
  enumerable: true,
  get: function () {
    return _constants.DEFAULT_CONFIGS;
  }
});

var _ConfigParser = _interopRequireDefault(require("./lib/ConfigParser"));

var _utils = require("./utils");

var _shim = require("./shim");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }