/// <reference types="request" />
import * as request from 'request';
export default class ApiAuth {
    request: any;
    hasAuth: boolean;
    sentAuth: boolean;
    appID: string;
    secret: string;
    constructor(req?: request.Request);
    init(appID: string, secret: string): void;
    onRequest(): void;
    buildHeaders(method: string, contentType: string, path: string): {
        authorization: string;
        date: string;
        contentType: string;
        ContentMD5: string;
    };
    private digest(method, contentType, path);
}
