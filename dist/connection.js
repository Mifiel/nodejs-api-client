"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const api_auth_1 = require("./api-auth");
const config_1 = require("./config");
var TYPES;
(function (TYPES) {
    TYPES[TYPES["json"] = 0] = "json";
    TYPES[TYPES["multipart"] = 1] = "multipart";
})(TYPES = exports.TYPES || (exports.TYPES = {}));
class Connection {
    static post(path, payload, type) {
        const options = {
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
    }
    static get(path, query) {
        return this.execute({
            url: path,
            method: 'GET',
            qs: query
        });
    }
    static delete(path) {
        return this.execute({
            url: path,
            method: 'DELETE'
        });
    }
    static put(path, payload) {
        return this.execute({
            url: path,
            method: 'PUT'
        });
    }
    static execute(options) {
        if (options.url[0] !== '/') {
            options.url = `/${options.url}`;
        }
        options.baseUrl = config_1.default.url;
        return new Promise((resolve, reject) => {
            options.callback = this.callbackHandler(resolve, reject);
            const req = request(options);
            const apiAuth = new api_auth_1.default(req);
            apiAuth.init(config_1.default.appID, config_1.default.appSecret);
            apiAuth.onRequest();
        });
    }
    static callbackHandler(resolve, reject) {
        return (error, response, body) => {
            if (error) {
                return reject(error);
            }
            if (response.statusCode >= 200 && response.statusCode < 300) {
                return resolve(this.parseBody(body));
            }
            reject({
                status: {
                    code: response.statusCode,
                    message: response.statusMessage
                },
                error: this.parseBody(body)
            });
        };
    }
    static parseBody(body) {
        try {
            return JSON.parse(body);
        }
        catch (e) {
            return body;
        }
    }
}
exports.Connection = Connection;
