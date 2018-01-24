export default class Config {
  private static uri: string;
  private static appId: string;
  private static secret: string;

  static setTokens(appId: string, secret: string) {
    this.appId = appId;
    this.secret = secret;
    this.uri = 'https://www.mifiel.com/api/v1'
  }

  static get appID(): string {
    return this.appId
  }

  static get appSecret(): string {
    return this.secret;
  }

  static set url(url: string) {
    this.uri = url;
  }

  static get url(): string {
    return this.uri;
  }
}
