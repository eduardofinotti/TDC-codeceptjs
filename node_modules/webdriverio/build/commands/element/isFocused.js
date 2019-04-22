"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFocused;

var _constants = require("../../constants");

var _utils = require("../../utils");

var _isFocused = _interopRequireDefault(require("../../scripts/isFocused"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * Return true or false if the selected DOM-element currently has focus. If the selector matches
 * multiple elements, it will return true if one of the elements has focus.
 *
 * <example>
    :index.html
    <input name="login" autofocus="" />
    :hasFocus.js
    it('should detect the focus of an element', () => {
        browser.url('/');
        const loginInput = $('[name="login"]');
        console.log(loginInput.hasFocus()); // outputs: false

        loginInput.click();
        console.log(loginInput.hasFocus()); // outputs: true
    })
 * </example>
 *
 * @alias element.isFocused
 * @return {Boolean}         true if one of the matching elements has focus
 *
 * @uses protocol/execute
 * @type state
 *
 */
function isFocused() {
  return (0, _utils.getBrowserObject)(this).execute(_isFocused.default, {
    [_constants.ELEMENT_KEY]: this.elementId,
    // w3c compatible
    ELEMENT: this.elementId // jsonwp compatible

  });
}