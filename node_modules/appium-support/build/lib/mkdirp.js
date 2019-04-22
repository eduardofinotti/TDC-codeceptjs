"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mkdirp = mkdirp;

require("source-map-support/register");

var _mkdirp2 = _interopRequireDefault(require("mkdirp"));

var _bluebird = _interopRequireDefault(require("bluebird"));

async function mkdirp(dir) {
  return await new _bluebird.default((resolve, reject) => {
    (0, _mkdirp2.default)(dir, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9ta2RpcnAuanMiXSwibmFtZXMiOlsibWtkaXJwIiwiZGlyIiwiQiIsInJlc29sdmUiLCJyZWplY3QiLCJlcnIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBRUEsZUFBZUEsTUFBZixDQUF1QkMsR0FBdkIsRUFBNEI7QUFDMUIsU0FBTyxNQUFNLElBQUlDLGlCQUFKLENBQU0sQ0FBQ0MsT0FBRCxFQUFVQyxNQUFWLEtBQXFCO0FBQ3RDLDBCQUFRSCxHQUFSLEVBQWNJLEdBQUQsSUFBUztBQUNwQixVQUFJQSxHQUFKLEVBQVM7QUFDUEQsUUFBQUEsTUFBTSxDQUFDQyxHQUFELENBQU47QUFDRCxPQUZELE1BRU87QUFDTEYsUUFBQUEsT0FBTztBQUNSO0FBQ0YsS0FORDtBQU9ELEdBUlksQ0FBYjtBQVNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF9ta2RpcnAgZnJvbSAnbWtkaXJwJztcbmltcG9ydCBCIGZyb20gJ2JsdWViaXJkJztcblxuYXN5bmMgZnVuY3Rpb24gbWtkaXJwIChkaXIpIHtcbiAgcmV0dXJuIGF3YWl0IG5ldyBCKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBfbWtkaXJwKGRpciwgKGVycikgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5leHBvcnQgeyBta2RpcnAgfTtcbiJdLCJmaWxlIjoibGliL21rZGlycC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLiJ9
