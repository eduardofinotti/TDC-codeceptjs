'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _Map = require('babel-runtime/core-js/map')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
function mapify(obj) {
  var m = new _Map();
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  if (obj instanceof Array) {
    var newArr = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _getIterator(obj), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var x = _step.value;

        newArr.push(mapify(x));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return newArr;
  }
  for (var k in obj) {
    if (obj.hasOwnProperty(k)) {
      m.set(k, mapify(obj[k]));
    }
  }
  return m;
}

function demapify(map) {
  if (map instanceof Array) {
    var newArr = [];
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = _getIterator(map), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var x = _step2.value;

        newArr.push(demapify(x));
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return newArr;
  } else if (!(map instanceof _Map)) {
    return map;
  }
  var obj = {};
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = _getIterator(map), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _step3$value = _slicedToArray(_step3.value, 2);

      var k = _step3$value[0];
      var v = _step3$value[1];

      obj[k] = demapify(v);
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3['return']) {
        _iterator3['return']();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return obj;
}

var objify = demapify;

exports.mapify = mapify;
exports.demapify = demapify;
exports.objify = objify;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsU0FBUyxNQUFNLENBQUUsR0FBRyxFQUFFO0FBQ3BCLE1BQUksQ0FBQyxHQUFHLFVBQVMsQ0FBQztBQUNsQixNQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxHQUFHLEtBQUssSUFBSSxFQUFFO0FBQzNDLFdBQU8sR0FBRyxDQUFDO0dBQ1o7QUFDRCxNQUFJLEdBQUcsWUFBWSxLQUFLLEVBQUU7QUFDeEIsUUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDOzs7Ozs7QUFDaEIsd0NBQWMsR0FBRyw0R0FBRTtZQUFWLENBQUM7O0FBQ1IsY0FBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztPQUN4Qjs7Ozs7Ozs7Ozs7Ozs7OztBQUNELFdBQU8sTUFBTSxDQUFDO0dBQ2Y7QUFDRCxPQUFLLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRTtBQUNqQixRQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDekIsT0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDMUI7R0FDRjtBQUNELFNBQU8sQ0FBQyxDQUFDO0NBQ1Y7O0FBRUQsU0FBUyxRQUFRLENBQUUsR0FBRyxFQUFFO0FBQ3RCLE1BQUksR0FBRyxZQUFZLEtBQUssRUFBRTtBQUN4QixRQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7Ozs7OztBQUNoQix5Q0FBYyxHQUFHLGlIQUFFO1lBQVYsQ0FBQzs7QUFDUixjQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO09BQzFCOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0QsV0FBTyxNQUFNLENBQUM7R0FDZixNQUFNLElBQUksRUFBRSxHQUFHLGlCQUFlLEFBQUMsRUFBRTtBQUNoQyxXQUFPLEdBQUcsQ0FBQztHQUNaO0FBQ0QsTUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDOzs7Ozs7QUFDYix1Q0FBbUIsR0FBRyxpSEFBRTs7O1VBQWQsQ0FBQztVQUFFLENBQUM7O0FBQ1osU0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN0Qjs7Ozs7Ozs7Ozs7Ozs7OztBQUNELFNBQU8sR0FBRyxDQUFDO0NBQ1o7O0FBRUQsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDOztRQUViLE1BQU0sR0FBTixNQUFNO1FBQUUsUUFBUSxHQUFSLFFBQVE7UUFBRSxNQUFNLEdBQU4sTUFBTSIsImZpbGUiOiJsaWIvbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIG1hcGlmeSAob2JqKSB7XG4gIGxldCBtID0gbmV3IE1hcCgpO1xuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcgfHwgb2JqID09PSBudWxsKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuICBpZiAob2JqIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICBsZXQgbmV3QXJyID0gW107XG4gICAgZm9yIChsZXQgeCBvZiBvYmopIHtcbiAgICAgIG5ld0Fyci5wdXNoKG1hcGlmeSh4KSk7XG4gICAgfVxuICAgIHJldHVybiBuZXdBcnI7XG4gIH1cbiAgZm9yIChsZXQgayBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICBtLnNldChrLCBtYXBpZnkob2JqW2tdKSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBtO1xufVxuXG5mdW5jdGlvbiBkZW1hcGlmeSAobWFwKSB7XG4gIGlmIChtYXAgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgIGxldCBuZXdBcnIgPSBbXTtcbiAgICBmb3IgKGxldCB4IG9mIG1hcCkge1xuICAgICAgbmV3QXJyLnB1c2goZGVtYXBpZnkoeCkpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3QXJyO1xuICB9IGVsc2UgaWYgKCEobWFwIGluc3RhbmNlb2YgTWFwKSkge1xuICAgIHJldHVybiBtYXA7XG4gIH1cbiAgbGV0IG9iaiA9IHt9O1xuICBmb3IgKGxldCBbaywgdl0gb2YgbWFwKSB7XG4gICAgb2JqW2tdID0gZGVtYXBpZnkodik7XG4gIH1cbiAgcmV0dXJuIG9iajtcbn1cblxubGV0IG9iamlmeSA9IGRlbWFwaWZ5O1xuXG5leHBvcnQgeyBtYXBpZnksIGRlbWFwaWZ5LCBvYmppZnkgfTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
