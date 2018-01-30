"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const model_1 = require("./model");
class Certificate extends model_1.Model {
    constructor(args) {
        super(args);
        this.multipart = true;
    }
    get resource() {
        return Certificate.resource;
    }
    save() {
        if (this.properties.file) {
            this.properties.cer_file = fs.createReadStream(this.properties.file);
        }
        return super.save();
    }
}
Certificate.resource = 'keys';
exports.default = Certificate;
