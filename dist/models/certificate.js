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
var fs = require("fs");
var model_1 = require("./model");
var connection_1 = require("../connection");
var Certificate = /** @class */ (function (_super) {
    __extends(Certificate, _super);
    function Certificate(args) {
        var _this = _super.call(this, args) || this;
        _this.multipart = true;
        return _this;
    }
    Object.defineProperty(Certificate.prototype, "resource", {
        get: function () {
            return Certificate.resource;
        },
        enumerable: true,
        configurable: true
    });
    Certificate.delete = function (id) {
        var cer = new Certificate({ id: id });
        return cer.delete();
    };
    Certificate.sat = function () {
        return connection_1.Connection.get('keys/sat_certificates');
    };
    Certificate.prototype.save = function () {
        if (this.properties.file) {
            this.properties.cer_file = fs.createReadStream(this.properties.file);
        }
        return _super.prototype.save.call(this);
    };
    Certificate.resource = 'keys';
    return Certificate;
}(model_1.Model));
exports.default = Certificate;
