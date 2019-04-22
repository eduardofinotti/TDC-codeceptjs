"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = scrollIntoView;

var _constants = require("../../constants");

/**
 *
 * Scroll element into viewport.
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
 *
 * <example>
    :scrollIntoView.js
    it('should demonstrate the scrollIntoView command', () => {
        const elem = $('#myElement');
        // scroll to specific element
        elem.scrollIntoView();
    });
 * </example>
 *
 * @alias element.scrollIntoView
 * @param {object|boolean=} scrollIntoViewOptions  boolean alignToTop or scrollIntoViewOptions object
 * @uses protocol/execute
 * @type utility
 *
 */
function scrollIntoView(scrollIntoViewOptions = true) {
  return this.parent.execute(
  /* istanbul ignore next */
  function (elem, options) {
    elem.scrollIntoView(options);
  }, {
    [_constants.ELEMENT_KEY]: this.elementId,
    // w3c compatible
    ELEMENT: this.elementId // jsonwp compatible

  }, scrollIntoViewOptions);
}