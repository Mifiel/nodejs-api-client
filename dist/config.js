"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    static setTokens(appId, secret) {
        this.appId = appId;
        this.secret = secret;
        this.uri = 'https://www.mifiel.com/api/v1';
    }
    static get appID() {
        return this.appId;
    }
    static get appSecret() {
        return this.secret;
    }
    static set url(url) {
        this.uri = url;
    }
    static get url() {
        return this.uri;
    }
}
exports.default = Config;
