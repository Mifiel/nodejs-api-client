"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
var api_auth_1 = require("./api-auth");
var config_1 = require("./config");
var TYPES;
(function (TYPES) {
    TYPES[TYPES["json"] = 0] = "json";
    TYPES[TYPES["multipart"] = 1] = "multipart";
})(TYPES = exports.TYPES || (exports.TYPES = {}));
var Connection = /** @class */ (function () {
    function Connection() {
    }
    Connection.post = function (path, payload, type) {
        var options = {
            url: path,
            method: 'POST'
        };
        if (type === TYPES.multipart) {
            options.formData = payload;
        }
        else {
            options.json = payload;
        }
        return this.execute(options);
    };
    Connection.get = function (path, query) {
        return this.execute({
            url: path,
            method: 'GET',
            qs: query
        });
    };
    Connection.delete = function (path) {
        return this.execute({
            url: path,
            method: 'DELETE'
        });
    };
    Connection.put = function (path, payload) {
        return this.execute({
            url: path,
            method: 'PUT'
        });
    };
    Connection.execute = function (options) {
        var _this = this;
        if (options.url[0] !== '/') {
            options.url = "/" + options.url;
        }
        options.baseUrl = config_1.default.url;
        return new Promise(function (resolve, reject) {
            options.callback = _this.callbackHandler(resolve, reject);
            var req = request(options);
            var apiAuth = new api_auth_1.default(req);
            apiAuth.init(config_1.default.appID, config_1.default.appSecret);
            apiAuth.onRequest();
        });
    };
    Connection.callbackHandler = function (resolve, reject) {
        var _this = this;
        return function (error, response, body) {
            if (error) {
                return reject(error);
            }
            if (response.statusCode >= 200 && response.statusCode < 300) {
                return resolve(_this.parseBody(body));
            }
            reject({
                status: {
                    code: response.statusCode,
                    message: response.statusMessage
                },
                error: _this.parseBody(body)
            });
        };
    };
    Connection.parseBody = function (body) {
        try {
            return JSON.parse(body);
        }
        catch (e) {
            return body;
        }
    };
    return Connection;
}());
exports.Connection = Connection;
