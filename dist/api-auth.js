"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Crypto = require("crypto");
var ApiAuth = /** @class */ (function () {
    function ApiAuth(req) {
        this.request = req;
    }
    ApiAuth.prototype.init = function (appID, secret) {
        if (typeof appID !== 'string' || (secret !== undefined && typeof secret !== 'string')) {
            this.request.emit('error', new Error('ApiAuth() received invalid appId or secret'));
        }
        this.appID = appID;
        this.secret = secret;
        this.hasAuth = true;
    };
    ApiAuth.prototype.onRequest = function () {
        var reqHeaders = this.request._form && this.request._form.getHeaders();
        var contentType = reqHeaders && reqHeaders['content-type'] || 'application/json';
        var method = this.request.method;
        var path = this.request.path;
        var headers = this.buildHeaders(method, contentType, path);
        this.request.setHeader('Authorization', headers.authorization);
        this.request.setHeader('Date', headers.date);
        this.request.setHeader('Content-Type', headers.contentType);
        this.request.setHeader('Content-MD5', headers.ContentMD5);
        this.sentAuth = true;
    };
    ApiAuth.prototype.buildHeaders = function (method, contentType, path) {
        var _a = this.digest(method, contentType, path), date = _a[0], md5 = _a[1], authHeader = _a[2];
        return {
            authorization: authHeader,
            date: date,
            contentType: contentType,
            ContentMD5: md5
        };
    };
    ApiAuth.prototype.digest = function (method, contentType, path) {
        var date = new Date().toUTCString();
        var md5 = '';
        var canonicalString = [
            method,
            contentType,
            md5,
            path,
            date
        ];
        var hmac = Crypto.createHmac('sha1', this.secret);
        hmac.update(canonicalString.join(','));
        var signature = hmac.digest('base64');
        var authHeader = "APIAuth " + this.appID + ":" + signature;
        return [date, md5, authHeader];
    };
    return ApiAuth;
}());
exports.default = ApiAuth;
