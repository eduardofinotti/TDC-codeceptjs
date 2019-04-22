"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getHTML;

/**
 * get HTML of selector element
 *
 * @param  {String}  element             element to get HTML from
 * @param  {Boolean} includeSelectorTag  if true, selector tag gets included (uses outerHTML)
 * @return {String}                      html source
 */
function getHTML(element, includeSelectorTag) {
  return element[includeSelectorTag ? 'outerHTML' : 'innerHTML'];
}