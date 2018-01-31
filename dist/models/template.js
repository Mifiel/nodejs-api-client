"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = require("./model");
var document_1 = require("./document");
var connection_1 = require("../connection");
var Template = /** @class */ (function (_super) {
    __extends(Template, _super);
    function Template(args) {
        var _this = _super.call(this, args) || this;
        _this.multipart = false;
        return _this;
    }
    Template.delete = function (id) {
        var template = new Template({ id: id });
        return template.delete();
    };
    Template.prototype.documents = function () {
        return connection_1.Connection.get(this.resource + "/" + this.properties.id + "/documents");
    };
    Template.prototype.generateDocument = function (args) {
        return document_1.default.createFromTemplate(Object.assign({}, args, { template_id: this.properties.id }));
    };
    Template.prototype.generateDocuments = function (callback_url, documents, identifier) {
        return document_1.default.createManyFromTemplate({
            template_id: this.properties.id,
            identifier: identifier,
            documents: documents,
            callback_url: callback_url
        });
    };
    Object.defineProperty(Template.prototype, "resource", {
        get: function () {
            return Template.resource;
        },
        enumerable: true,
        configurable: true
    });
    Template.resource = 'templates';
    return Template;
}(model_1.Model));
exports.default = Template;
