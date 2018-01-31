"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var connection_1 = require("../connection");
var Model = /** @class */ (function () {
    function Model(args) {
        this.properties = args || {};
    }
    Model.all = function (query) {
        return connection_1.Connection.get(this.resource, query);
    };
    Model.find = function (id, query) {
        return connection_1.Connection.get(this.resource + "/" + id);
    };
    Model.prototype.delete = function () {
        if (!this.properties.id) {
            throw 'To delete the model you must instantiate it with an id';
        }
        return connection_1.Connection.delete(this.resource + "/" + this.properties.id);
    };
    Model.prototype.save = function () {
        if (this.properties.id) {
            return connection_1.Connection.put(this.resource + "/" + this.properties.id, this.properties);
        }
        var type = connection_1.TYPES.json;
        if (this.multipart) {
            type = connection_1.TYPES.multipart;
        }
        this.cleanupPostParams();
        return connection_1.Connection.post(this.resource, this.properties, type);
    };
    Model.prototype.cleanupPostParams = function () {
        for (var property in this.properties) {
            var val = this.properties[property];
            var isStream = val instanceof fs.ReadStream;
            if (!isStream && (val instanceof Array || val instanceof Object)) {
                this.properties[property] = JSON.stringify(val);
            }
        }
    };
    return Model;
}());
exports.Model = Model;
