export default class Config {
  private static url: string;
  private static appId: string;
  private static secret: string;

  static setTokens(appId: string, secret: string) {
    this.appId = appId;
    this.secret = secret;
    this.url = 'https://www.mifiel.com/api/v1'
  }

  static setUrl(url: string) {
    this.url = url;
  }

  static getUrl(): string {
    return this.url;
  }
}
