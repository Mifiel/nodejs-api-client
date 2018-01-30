"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Crypto = require("crypto");
class ApiAuth {
    constructor(req) {
        this.request = req;
    }
    init(appID, secret) {
        if (typeof appID !== 'string' || (secret !== undefined && typeof secret !== 'string')) {
            this.request.emit('error', new Error('ApiAuth() received invalid appId or secret'));
        }
        this.appID = appID;
        this.secret = secret;
        this.hasAuth = true;
    }
    onRequest() {
        const reqHeaders = this.request._form && this.request._form.getHeaders();
        const contentType = reqHeaders && reqHeaders['content-type'] || 'application/json';
        const method = this.request.method;
        const path = this.request.path;
        const headers = this.buildHeaders(method, contentType, path);
        this.request.setHeader('Authorization', headers.authorization);
        this.request.setHeader('Date', headers.date);
        this.request.setHeader('Content-Type', headers.contentType);
        this.request.setHeader('Content-MD5', headers.ContentMD5);
        this.sentAuth = true;
    }
    buildHeaders(method, contentType, path) {
        const [date, md5, authHeader] = this.digest(method, contentType, path);
        return {
            authorization: authHeader,
            date: date,
            contentType: contentType,
            ContentMD5: md5
        };
    }
    digest(method, contentType, path) {
        const date = new Date().toUTCString();
        const md5 = '';
        const canonicalString = [
            method,
            contentType,
            md5,
            path,
            date
        ];
        const hmac = Crypto.createHmac('sha1', this.secret);
        hmac.update(canonicalString.join(','));
        const signature = hmac.digest('base64');
        const authHeader = `APIAuth ${this.appID}:${signature}`;
        return [date, md5, authHeader];
    }
}
exports.default = ApiAuth;
