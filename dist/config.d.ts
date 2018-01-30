export default class Config {
    private static uri;
    private static appId;
    private static secret;
    static setTokens(appId: string, secret: string): void;
    static readonly appID: string;
    static readonly appSecret: string;
    static url: string;
}
