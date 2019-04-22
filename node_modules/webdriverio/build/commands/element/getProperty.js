"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getProperty;

var _utils = require("../../utils");

var _getProperty = _interopRequireDefault(require("../../scripts/getProperty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The Get Element Property command will return the result of getting a property of an element.
 *
 * <example>
    :getProperty.js
    it('should demonstrate the getCSSProperty command', () => {
        var elem = $('body')
        var color = elem.getProperty('tagName')
        console.log(color) // outputs: "BODY"
    })
 * </example>
 *
 * @alias element.getProperty
 * @param {String} property  name of the element property
 * @return {Object|String} the value of the property of the selected element
 */
function getProperty(property) {
  if (this.isW3C) {
    return this.getElementProperty(this.elementId, property);
  }

  return (0, _utils.getBrowserObject)(this).execute(_getProperty.default, {
    ELEMENT: this.elementId
  }, property);
}