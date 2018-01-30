"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
const document_1 = require("./document");
const connection_1 = require("../connection");
class Template extends model_1.Model {
    constructor(args) {
        super(args);
        this.multipart = false;
    }
    documents() {
        return connection_1.Connection.get(`${this.resource}/${this.properties.id}/documents`);
    }
    generateDocument(args) {
        return document_1.default.createFromTemplate(Object.assign({}, args, { template_id: this.properties.id }));
    }
    generateDocuments(callback_url, documents, identifier) {
        return document_1.default.createManyFromTemplate({
            template_id: this.properties.id,
            identifier: identifier,
            documents: documents,
            callback_url: callback_url
        });
    }
    get resource() {
        return Template.resource;
    }
}
Template.resource = 'templates';
exports.default = Template;
