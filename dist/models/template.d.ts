import Base from './base';
import { Payload, Model } from './model';
export default class Template extends Model implements Base {
    multipart: boolean;
    static resource: string;
    constructor(args?: Payload);
    static delete(id: string): Promise<object>;
    documents(): Promise<Array<object>>;
    generateDocument(args?: object): Promise<object>;
    generateDocuments(callback_url: string, documents: Array<object>, identifier?: string): Promise<Array<object>>;
    readonly resource: string;
}
