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
var Crypto = require("crypto");
var fs = require("fs");
var model_1 = require("./model");
var connection_1 = require("../connection");
var Document = /** @class */ (function (_super) {
    __extends(Document, _super);
    function Document(args) {
        var _this = _super.call(this, args) || this;
        _this.multipart = false;
        return _this;
    }
    Object.defineProperty(Document.prototype, "resource", {
        get: function () {
            return Document.resource;
        },
        enumerable: true,
        configurable: true
    });
    Document.delete = function (id) {
        var doc = new Document({ id: id });
        return doc.delete();
    };
    Document.createFromTemplate = function (args) {
        var url = this.resource + "/" + args.template_id + "/generate_document";
        delete args.template_id;
        return connection_1.Connection.post(url, args);
    };
    Document.createManyFromTemplate = function (args) {
        var url = this.resource + "/" + args.template_id + "/generate_documents";
        delete args.template_id;
        return connection_1.Connection.post(url, args);
    };
    Document.getHash = function (filename) {
        var file = fs.readFileSync(filename);
        var sha256 = Crypto.createHash('sha256');
        sha256.update(file);
        return sha256.digest('hex');
    };
    Document.prototype.save = function () {
        if (this.properties.file) {
            this.multipart = true;
            this.properties.file = fs.createReadStream(this.properties.file);
        }
        return _super.prototype.save.call(this);
    };
    Document.prototype.saveFile = function (path) {
        return this.getAndSaveFile(this.resource + "/" + this.properties.id + "/file", path, null);
    };
    Document.prototype.saveFileSigned = function (path) {
        return this.getAndSaveFile(this.resource + "/" + this.properties.id + "/file_signed", path, null);
    };
    Document.prototype.saveXML = function (path) {
        return this.getAndSaveFile(this.resource + "/" + this.properties.id + "/xml", path);
    };
    Document.prototype.getAndSaveFile = function (url, path, encoding) {
        if (encoding === undefined) {
            encoding = 'utf8';
        }
        var opts = { url: url, method: 'GET', encoding: encoding };
        return connection_1.Connection.execute(opts).then(function (data) {
            var writeStream = fs.createWriteStream(path, { encoding: encoding });
            writeStream.write(data);
            writeStream.end();
            return true;
        });
    };
    Document.resource = 'documents';
    return Document;
}(model_1.Model));
exports.default = Document;
