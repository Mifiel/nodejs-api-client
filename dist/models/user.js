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
var connection_1 = require("../connection");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(args) {
        return _super.call(this, args) || this;
    }
    Object.defineProperty(User.prototype, "resource", {
        get: function () {
            return User.resource;
        },
        enumerable: true,
        configurable: true
    });
    User.setupWidget = function (args) {
        if (!args.email)
            throw 'email is required';
        if (!args.tax_id)
            throw 'tax_id is required';
        return connection_1.Connection.post(this.resource + "/setup-widget", args);
    };
    User.me = function () {
        return connection_1.Connection.get(this.resource + "/me");
    };
    User.all = function (query) {
        throw 'MethodNotAllowed';
    };
    User.find = function (id, query) {
        throw 'MethodNotAllowed';
    };
    User.resource = 'users';
    return User;
}(model_1.Model));
exports.default = User;
