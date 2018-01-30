"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("../connection");
class Model {
    constructor(args) {
        this.properties = args || {};
    }
    static all(query) {
        return connection_1.Connection.get(this.resource, query);
    }
    static find(id, query) {
        return connection_1.Connection.get(`${this.resource}/${id}`);
    }
    delete() {
        if (!this.properties.id) {
            throw 'To delete the model you must instantiate it with an id';
        }
        return connection_1.Connection.delete(`${this.resource}/${this.properties.id}`);
    }
    save() {
        if (this.properties.id) {
            return connection_1.Connection.put(`${this.resource}/${this.properties.id}`, this.properties);
        }
        let type = connection_1.TYPES.json;
        if (this.multipart) {
            type = connection_1.TYPES.multipart;
        }
        for (const property in this.properties) {
            const val = this.properties[property];
            if (val instanceof Array || val instanceof Object) {
                this.properties[property] = JSON.stringify(val);
            }
        }
        return connection_1.Connection.post(this.resource, this.properties, type);
    }
}
exports.Model = Model;
