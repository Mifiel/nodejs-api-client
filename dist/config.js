"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config = /** @class */ (function () {
    function Config() {
    }
    Config.setTokens = function (appId, secret) {
        this.appId = appId;
        this.secret = secret;
        this.uri = 'https://www.mifiel.com/api/v1';
    };
    Object.defineProperty(Config, "appID", {
        get: function () {
            return this.appId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config, "appSecret", {
        get: function () {
            return this.secret;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config, "url", {
        get: function () {
            return this.uri;
        },
        set: function (url) {
            this.uri = url;
        },
        enumerable: true,
        configurable: true
    });
    return Config;
}());
exports.default = Config;
