/**
 * @author Charlike Mike Reagent <open.source.charlike@gmail.com>
 * @copyright 2016-present @tunnckoCore/team and contributors
 * @license MIT
 */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var arrayify = _interopDefault(require('arrify'));
var babylon = _interopDefault(require('babylon'));
var define = _interopDefault(require('define-property'));

/*!
 * parse-function <https://github.com/tunnckoCore/parse-function>
 *
 * Copyright (c) 2017 Charlike Mike Reagent <open.source.charlike@gmail.com> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

/* eslint-disable jsdoc/require-param-description */
const utils = {};
utils.define = define;
utils.arrayify = arrayify;
/**
 * > Create default result object,
 * and normalize incoming arguments.
 *
 * @param  {Function|String} code
 * @return {Object} result
 * @private
 */

utils.setDefaults = function setDefaults(code) {
  const result = {
    name: null,
    body: '',
    args: [],
    params: ''
  };

  if (typeof code === 'function') {
    code = code.toString('utf8');
  }

  if (typeof code !== 'string') {
    code = ''; // makes result.isValid === false
  }

  return utils.setHiddenDefaults(result, code);
};
/**
 * > Create hidden properties into
 * the result object.
 *
 * @param  {Object} result
 * @param  {Function|String} code
 * @return {Object} result
 * @private
 */


utils.setHiddenDefaults = function setHiddenDefaults(result, code) {
  utils.define(result, 'defaults', {});
  utils.define(result, 'value', code);
  utils.define(result, 'isValid', code.length > 0);
  utils.define(result, 'isArrow', false);
  utils.define(result, 'isAsync', false);
  utils.define(result, 'isNamed', false);
  utils.define(result, 'isAnonymous', false);
  utils.define(result, 'isGenerator', false);
  utils.define(result, 'isExpression', false);
  return result;
};
/**
 * > Get needed AST tree, depending on what
 * parse method is used.
 *
 * @param  {Object} result
 * @param  {Object} opts
 * @return {Object} node
 * @private
 */


utils.getNode = function getNode(result, opts) {
  if (typeof opts.parse === 'function') {
    result.value = `(${result.value})`;
    const ast = opts.parse(result.value, opts);
    const body = ast.program && ast.program.body || ast.body;
    return body[0].expression;
  }

  return babylon.parseExpression(result.value, opts);
};

/*!
 * parse-function <https://github.com/tunnckoCore/parse-function>
 *
 * Copyright (c) 2017 Charlike Mike Reagent <open.source.charlike@gmail.com> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

/* eslint-disable jsdoc/require-param-description, jsdoc/check-param-names */

/**
 * > Micro plugin to get the raw body, without the
 * surrounding curly braces. It also preserves
 * the whitespaces and newlines - they are original.
 *
 * @param  {Object} node
 * @param  {Object} result
 * @return {Object} result
 * @private
 */
var body = (app => (node, result) => {
  result.body = result.value.slice(node.body.start, node.body.end);
  const openCurly = result.body.charCodeAt(0) === 123;
  const closeCurly = result.body.charCodeAt(result.body.length - 1) === 125;

  if (openCurly && closeCurly) {
    result.body = result.body.slice(1, -1);
  }

  return result;
});

/*!
 * parse-function <https://github.com/tunnckoCore/parse-function>
 *
 * Copyright (c) 2017 Charlike Mike Reagent <open.source.charlike@gmail.com> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

/* eslint-disable jsdoc/require-param-description, jsdoc/check-param-names */

/**
 * > Set couple of hidden properties and
 * the name of the given function to
 * the returned result object. Notice that
 * if function is called "anonymous" then
 * the `result.isAnonymous` would be `false`, because
 * in reality it is named function. It would be `true`
 * only when function is really anonymous and don't have
 * any name.
 *
 * @param  {Object} node
 * @param  {Object} result
 * @return {Object} result
 * @private
 */
var props = (app => (node, result) => {
  app.define(result, 'isArrow', node.type.startsWith('Arrow'));
  app.define(result, 'isAsync', node.async || false);
  app.define(result, 'isGenerator', node.generator || false);
  app.define(result, 'isExpression', node.expression || false);
  app.define(result, 'isAnonymous', node.id === null);
  app.define(result, 'isNamed', !result.isAnonymous); // if real anonymous -> set to null,
  // notice that you can name you function `anonymous`, haha
  // and it won't be "real" anonymous, so `isAnonymous` will be `false`

  result.name = result.isAnonymous ? null : node.id.name;
  return result;
});

/*!
 * parse-function <https://github.com/tunnckoCore/parse-function>
 *
 * Copyright (c) 2017 Charlike Mike Reagent <open.source.charlike@gmail.com> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

/* eslint-disable jsdoc/require-param-description, jsdoc/check-param-names */

/**
 * > Micro plugin to visit each of the params
 * in the given function and collect them into
 * an `result.args` array and `result.params` string.
 *
 * @param  {Object} node
 * @param  {Object} result
 * @return {Object} result
 * @private
 */
var params = (app => (node, result) => {
  if (!node.params.length) {
    return result;
  }

  node.params.forEach(param => {
    const defaultArgsName = param.type === 'AssignmentPattern' && param.left && param.left.name;
    const restArgName = param.type === 'RestElement' && param.argument && param.argument.name;
    const name = param.name || defaultArgsName || restArgName;
    result.args.push(name);

    if (param.right && param.right.type === 'SequenceExpression') {
      let lastExpression = param.right.expressions.pop();
      result.defaults[name] = result.value.slice(lastExpression.start, lastExpression.end);
    } else {
      result.defaults[name] = param.right ? result.value.slice(param.right.start, param.right.end) : undefined;
    }
  });
  result.params = result.args.join(', ');
  return result;
});

/*!
 * parse-function <https://github.com/tunnckoCore/parse-function>
 *
 * Copyright (c) 2017 Charlike Mike Reagent <open.source.charlike@gmail.com> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

/* eslint-disable jsdoc/require-param-description, jsdoc/check-param-names */
/**
 * > Default plugin that handles regular functions,
 * arrow functions, generator functions
 * and ES6 object method notation.
 *
 * @param  {Object} node
 * @param  {Object} result
 * @return {Object} resul
 * @private
 */

var initial = (app => (node, result) => {
  const isFn = node.type.endsWith('FunctionExpression');
  const isMethod = node.type === 'ObjectExpression';
  /* istanbul ignore next */

  if (!isFn && !isMethod) {
    return;
  }

  node = isMethod ? node.properties[0] : node;
  node.id = isMethod ? node.key : node.id; // babylon node.properties[0] is `ObjectMethod` that has `params` and `body`;
  // acorn node.properties[0] is `Property` that has `value`;

  if (node.type === 'Property') {
    const id = node.key;
    node = node.value;
    node.id = id;
  }

  result = props(app)(node, result);
  result = params(app)(node, result);
  result = body(app)(node, result);
  return result;
});

/*!
 * parse-function <https://github.com/tunnckoCore/parse-function>
 *
 * Copyright (c) 2017 Charlike Mike Reagent <open.source.charlike@gmail.com> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

/**
 * Utilities
 */
/**
 * Core plugins
 */

/**
 * > Initializes with optional `opts` object which is passed directly
 * to the desired parser and returns an object
 * with `.use` and `.parse` methods. The default parse which
 * is used is [babylon][]'s `.parseExpression` method from `v7`.
 *
 * ```js
 * const parseFunction = require('parse-function')
 *
 * const app = parseFunction({
 *   ecmaVersion: 2017
 * })
 *
 * const fixtureFn = (a, b, c) => {
 *   a = b + c
 *   return a + 2
 * }
 *
 * const result = app.parse(fixtureFn)
 * console.log(result)
 *
 * // see more
 * console.log(result.name) // => null
 * console.log(result.isNamed) // => false
 * console.log(result.isArrow) // => true
 * console.log(result.isAnonymous) // => true
 *
 * // array of names of the arguments
 * console.log(result.args) // => ['a', 'b', 'c']
 *
 * // comma-separated names of the arguments
 * console.log(result.params) // => 'a, b, c'
 * ```
 *
 * @param  {Object} `opts` optional, merged with options passed to `.parse` method
 * @return {Object} `app` object with `.use` and `.parse` methods
 * @name   parseFunction
 * @api public
 */

function parseFunction(opts) {
  const plugins = [];
  const app = {
    /**
     * > Parse a given `code` and returns a `result` object
     * with useful properties - such as `name`, `body` and `args`.
     * By default it uses Babylon parser, but you can switch it by
     * passing `options.parse` - for example `options.parse: acorn.parse`.
     * In the below example will show how to use `acorn` parser, instead
     * of the default one.
     *
     * ```js
     * const acorn = require('acorn')
     * const parseFn = require('parse-function')
     * const app = parseFn()
     *
     * const fn = function foo (bar, baz) { return bar * baz }
     * const result = app.parse(fn, {
     *   parse: acorn.parse,
     *   ecmaVersion: 2017
     * })
     *
     * console.log(result.name) // => 'foo'
     * console.log(result.args) // => ['bar', 'baz']
     * console.log(result.body) // => ' return bar * baz '
     * console.log(result.isNamed) // => true
     * console.log(result.isArrow) // => false
     * console.log(result.isAnonymous) // => false
     * console.log(result.isGenerator) // => false
     * ```
     *
     * @param  {Function|String} `code` any kind of function or string to be parsed
     * @param  {Object} `options` directly passed to the parser - babylon, acorn, espree
     * @param  {Function} `options.parse` by default `babylon.parseExpression`,
     *                                    all `options` are passed as second argument
     *                                    to that provided function
     * @return {Object} `result` see [result section](#result) for more info
     * @name   .parse
     * @api public
     */
    parse(code, options) {
      let result = utils.setDefaults(code);

      if (!result.isValid) {
        return result;
      }

      opts = Object.assign({}, opts, options);
      const isFunction = result.value.startsWith('function');
      const isAsyncFn = result.value.startsWith('async function');
      const isAsync = result.value.startsWith('async');
      const isArrow = result.value.includes('=>');
      const isAsyncArrow = isAsync && isArrow; // eslint-disable-next-line no-useless-escape

      const isMethod = /^\*?.+\([\s\S\w\W]*\)\s*\{/i.test(result.value);

      if (!(isFunction || isAsyncFn || isAsyncArrow) && isMethod) {
        result.value = `{ ${result.value} }`;
      }

      let node = utils.getNode(result, opts);
      return plugins.reduce((res, fn) => fn(node, res) || res, result);
    },

    /**
     * > Add a plugin `fn` function for extending the API or working on the
     * AST nodes. The `fn` is immediately invoked and passed
     * with `app` argument which is instance of `parseFunction()` call.
     * That `fn` may return another function that
     * accepts `(node, result)` signature, where `node` is an AST node
     * and `result` is an object which will be returned [result](#result)
     * from the `.parse` method. This retuned function is called on each
     * node only when `.parse` method is called.
     *
     * _See [Plugins Architecture](#plugins-architecture) section._
     *
     * ```js
     * // plugin extending the `app`
     * app.use((app) => {
     *   app.define(app, 'hello', (place) => `Hello ${place}!`)
     * })
     *
     * const hi = app.hello('World')
     * console.log(hi) // => 'Hello World!'
     *
     * // or plugin that works on AST nodes
     * app.use((app) => (node, result) => {
     *   if (node.type === 'ArrowFunctionExpression') {
     *     result.thatIsArrow = true
     *   }
     *   return result
     * })
     *
     * const result = app.parse((a, b) => (a + b + 123))
     * console.log(result.name) // => null
     * console.log(result.isArrow) // => true
     * console.log(result.thatIsArrow) // => true
     *
     * const result = app.parse(function foo () { return 123 })
     * console.log(result.name) // => 'foo'
     * console.log(result.isArrow) // => false
     * console.log(result.thatIsArrow) // => undefined
     * ```
     *
     * @param  {Function} `fn` plugin to be called
     * @return {Object} `app` instance for chaining
     * @name   .use
     * @api public
     */
    use(fn) {
      const ret = fn(app);

      if (typeof ret === 'function') {
        plugins.push(ret);
      }

      return app;
    },

    /**
     * > Define a non-enumerable property on an object. Just
     * a convenience mirror of the [define-property][] library,
     * so check out its docs. Useful to be used in plugins.
     *
     * ```js
     * const parseFunction = require('parse-function')
     * const app = parseFunction()
     *
     * // use it like `define-property` lib
     * const obj = {}
     * app.define(obj, 'hi', 'world')
     * console.log(obj) // => { hi: 'world' }
     *
     * // or define a custom plugin that adds `.foo` property
     * // to the end result, returned from `app.parse`
     * app.use((app) => {
     *   return (node, result) => {
     *     // this function is called
     *     // only when `.parse` is called
     *
     *     app.define(result, 'foo', 123)
     *
     *     return result
     *   }
     * })
     *
     * // fixture function to be parsed
     * const asyncFn = async (qux) => {
     *   const bar = await Promise.resolve(qux)
     *   return bar
     * }
     *
     * const result = app.parse(asyncFn)
     *
     * console.log(result.name) // => null
     * console.log(result.foo) // => 123
     * console.log(result.args) // => ['qux']
     *
     * console.log(result.isAsync) // => true
     * console.log(result.isArrow) // => true
     * console.log(result.isNamed) // => false
     * console.log(result.isAnonymous) // => true
     * ```
     *
     * @param  {Object} `obj` the object on which to define the property
     * @param  {String} `prop` the name of the property to be defined or modified
     * @param  {Any} `val` the descriptor for the property being defined or modified
     * @return {Object} `obj` the passed object, but modified
     * @name   .define
     * @api public
     */
    define: utils.define
  };
  app.use(initial);
  return app;
}

module.exports = parseFunction;
