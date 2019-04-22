"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _waitUntil = _interopRequireDefault(require("../browser/waitUntil"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Nothing to see here!
 * The original implementation is in the browser scope. Since the element
 * scope should be able to query sub elements of itself this command is
 * just a placeholder so it gets picked up as regular command.
 */
var _default = _waitUntil.default;
exports.default = _default;