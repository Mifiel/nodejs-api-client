import Base from './base';
export interface Payload {
    [selector: string]: any;
}
export declare abstract class Model implements Base {
    multipart: boolean;
    static resource: string;
    protected properties: Payload;
    constructor(args: Payload);
    readonly abstract resource: string;
    static all(query?: object): Promise<Array<object>>;
    static find(id: string | number, query?: object): Promise<object>;
    delete(): Promise<object>;
    save(): Promise<object>;
    private cleanupPostParams();
}
