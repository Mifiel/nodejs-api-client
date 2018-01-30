export declare enum TYPES {
    'json' = 0,
    'multipart' = 1,
}
export interface Payload {
    [selector: string]: object | string;
}
export declare class Connection {
    static post(path: string, payload: Payload | Array<Payload>, type?: number): Promise<any>;
    static get(path: string, query?: object): Promise<any>;
    static delete(path: string): Promise<any>;
    static put(path: string, payload: Payload): Promise<any>;
    private static execute(options);
    private static callbackHandler(resolve, reject);
    private static parseBody(body);
}
