import Base from './base';
import { Payload, Model } from './model';
export default class User extends Model implements Base {
    static resource: string;
    constructor(args?: Payload);
    readonly resource: string;
    static setupWidget(args: {
        email: string;
        tax_id: string;
        callback_url?: string;
    }): Promise<any>;
    static me(): Promise<object>;
    static all(query?: object): Promise<object[]>;
    static find(id: string | number, query?: object): Promise<object>;
}
