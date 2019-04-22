"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _url = _interopRequireDefault(require("url"));

var _http = _interopRequireDefault(require("http"));

var _path = _interopRequireDefault(require("path"));

var _https = _interopRequireDefault(require("https"));

var _lodash = _interopRequireDefault(require("lodash.merge"));

var _request = _interopRequireDefault(require("request"));

var _events = _interopRequireDefault(require("events"));

var _logger = _interopRequireDefault(require("@wdio/logger"));

var _utils = require("./utils");

var _package = _interopRequireDefault(require("../package.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const log = (0, _logger.default)('webdriver');
const agents = {
  http: new _http.default.Agent({
    keepAlive: true
  }),
  https: new _https.default.Agent({
    keepAlive: true
  })
};

class WebDriverRequest extends _events.default {
  constructor(method, endpoint, body) {
    super();
    this.body = body;
    this.method = method;
    this.endpoint = endpoint;
    this.requiresSessionId = this.endpoint.match(/:sessionId/);
    this.defaultOptions = {
      method,
      followAllRedirects: true,
      json: true,
      headers: {
        'Connection': 'keep-alive',
        'Accept': 'application/json',
        'User-Agent': 'webdriver/' + _package.default.version
      }
    };
  }

  makeRequest(options, sessionId) {
    const fullRequestOptions = (0, _lodash.default)({}, this.defaultOptions, this._createOptions(options, sessionId));
    this.emit('request', fullRequestOptions);
    return this._request(fullRequestOptions, options.connectionRetryCount);
  }

  _createOptions(options, sessionId) {
    const requestOptions = {
      agent: options.agent || agents[options.protocol],
      headers: typeof options.headers === 'object' ? options.headers : {},
      qs: typeof options.queryParams === 'object' ? options.queryParams : {}
      /**
       * only apply body property if existing
       */

    };

    if (this.body && (Object.keys(this.body).length || this.method === 'POST')) {
      requestOptions.body = this.body;
      requestOptions.headers = (0, _lodash.default)({}, requestOptions.headers, {
        'Content-Length': Buffer.byteLength(JSON.stringify(requestOptions.body), 'UTF-8')
      });
    }
    /**
     * if we don't have a session id we set it here, unless we call commands that don't require session ids, for
     * example /sessions. The call to /sessions is not connected to a session itself and it therefore doesn't
     * require it
     */


    if (this.requiresSessionId && !sessionId) {
      throw new Error('A sessionId is required for this command');
    }

    requestOptions.uri = _url.default.parse(`${options.protocol}://` + `${options.hostname}:${options.port}` + _path.default.join(options.path, this.endpoint.replace(':sessionId', sessionId)));
    /**
     * send authentication credentials only when creating new session
     */

    if (this.endpoint === '/session' && options.user && options.key) {
      requestOptions.auth = {
        user: options.user,
        pass: options.key
      };
    }
    /**
     * if the environment variable "STRICT_SSL" is defined as "false", it doesn't require SSL certificates to be valid.
     */


    requestOptions.strictSSL = !(process.env.STRICT_SSL === 'false' || process.env.strict_ssl === 'false');
    return requestOptions;
  }

  _request(fullRequestOptions, totalRetryCount = 0, retryCount = 0) {
    log.info(`[${fullRequestOptions.method}] ${fullRequestOptions.uri.href}`);

    if (fullRequestOptions.body && Object.keys(fullRequestOptions.body).length) {
      log.info('DATA', fullRequestOptions.body);
    }

    return new Promise((resolve, reject) => (0, _request.default)(fullRequestOptions, (err, response, body) => {
      const error = err || (0, _utils.getErrorFromResponseBody)(body);
      /**
       * Resolve only if successful response
       */

      if (!err && (0, _utils.isSuccessfulResponse)(response.statusCode, body)) {
        this.emit('response', {
          result: body
        });
        return resolve(body);
      }
      /**
       *  stop retrying as this will never be successful.
       *  we will handle this at the elementErrorHandler
       */


      if (error.name === 'stale element reference') {
        log.warn('Request encountered a stale element - terminating request');
        this.emit('response', {
          error
        });
        return reject(error);
      }
      /**
       * stop retrying if totalRetryCount was exceeded or there is no reason to
       * retry, e.g. if sessionId is invalid
       */


      if (retryCount >= totalRetryCount || error.message.includes('invalid session id')) {
        log.error('Request failed due to', error);
        this.emit('response', {
          error
        });
        return reject(error);
      }

      ++retryCount;
      this.emit('retry', {
        error,
        retryCount
      });
      log.warn('Request failed due to', error.message);
      log.info(`Retrying ${retryCount}/${totalRetryCount}`);

      this._request(fullRequestOptions, totalRetryCount, retryCount).then(resolve, reject);
    }));
  }

}

exports.default = WebDriverRequest;