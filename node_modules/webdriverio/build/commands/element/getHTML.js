"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getHTML;

var _constants = require("../../constants");

var _utils = require("../../utils");

var _getHTML = _interopRequireDefault(require("../../scripts/getHTML"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * Get source code of specified DOM element by selector.
 *
 * <example>
    :index.html
    <div id="test">
        <span>Lorem ipsum dolor amet</span>
    </div>
    :getHTML.js
    it('should get html for certain elements', () => {
        var outerHTML = $('#test').getHTML();
        console.log(outerHTML);
        // outputs:
        // "<div id="test"><span>Lorem ipsum dolor amet</span></div>"

        var innerHTML = $('#test').getHTML(false);
        console.log(innerHTML);
        // outputs:
        // "<span>Lorem ipsum dolor amet</span>"
    });
 * </example>
 *
 * @alias element.getHTML
 * @param {Boolean=} includeSelectorTag if true it includes the selector element tag (default: true)
 * @return {String}  the HTML of the specified element
 * @uses action/selectorExecute
 * @type property
 *
 */
function getHTML(includeSelectorTag = true) {
  return (0, _utils.getBrowserObject)(this).execute(_getHTML.default, {
    [_constants.ELEMENT_KEY]: this.elementId,
    // w3c compatible
    ELEMENT: this.elementId // jsonwp compatible

  }, includeSelectorTag);
}