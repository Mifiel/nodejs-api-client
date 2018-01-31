import Base from './base';
import { Payload, Model } from './model';
export default class Document extends Model implements Base {
    multipart: boolean;
    static resource: string;
    constructor(args?: Payload);
    readonly resource: string;
    static delete(id: string): Promise<object>;
    static createFromTemplate(args: any): Promise<object>;
    static createManyFromTemplate(args: any): Promise<Array<object>>;
    static getHash(filename: string): string;
    save(): Promise<object>;
    saveFile(path: string): Promise<boolean>;
    saveFileSigned(path: string): Promise<boolean>;
    saveXML(path: string): Promise<boolean>;
    private getAndSaveFile(url, path, encoding?);
}
