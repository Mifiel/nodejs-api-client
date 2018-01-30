"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
const connection_1 = require("../connection");
class User extends model_1.Model {
    constructor(args) {
        super(args);
    }
    get resource() {
        return User.resource;
    }
    static setupWidget(args) {
        if (!args.email)
            throw 'email is required';
        if (!args.tax_id)
            throw 'tax_id is required';
        return connection_1.Connection.post(`${this.resource}/setup-widget`, args);
    }
    static me() {
        return connection_1.Connection.get(`${this.resource}/me`);
    }
    static all(query) {
        throw 'MethodNotAllowed';
    }
    static find(id, query) {
        throw 'MethodNotAllowed';
    }
}
User.resource = 'users';
exports.default = User;
