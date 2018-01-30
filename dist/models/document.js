"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Crypto = require("crypto");
const fs = require("fs");
const model_1 = require("./model");
const connection_1 = require("../connection");
class Document extends model_1.Model {
    constructor(args) {
        super(args);
        this.multipart = false;
    }
    get resource() {
        return Document.resource;
    }
    static createFromTemplate(args) {
        const url = `${this.resource}/${args.template_id}/generate_document`;
        delete args.template_id;
        return connection_1.Connection.post(url, args);
    }
    static createManyFromTemplate(args) {
        const url = `${this.resource}/${args.template_id}/generate_documents`;
        delete args.template_id;
        return connection_1.Connection.post(url, args);
    }
    static getHash(filename) {
        const file = fs.readFileSync(filename);
        const sha256 = Crypto.createHash('sha256');
        sha256.update(file);
        return sha256.digest('hex');
    }
    save() {
        if (this.properties.file) {
            this.multipart = true;
            this.properties.file = fs.createReadStream(this.properties.file);
        }
        return super.save();
    }
}
Document.resource = 'documents';
exports.default = Document;
