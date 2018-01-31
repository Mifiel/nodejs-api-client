import Base from './base';
import { Payload, Model } from './model';
export default class Certificate extends Model implements Base {
    multipart: boolean;
    static resource: string;
    constructor(args?: Payload);
    readonly resource: string;
    static delete(id: string): Promise<object>;
    static sat(): Promise<Array<object>>;
    save(): Promise<object>;
}
