"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceModel = exports.ServiceSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ServiceSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    identifier: { type: String, required: true },
    icon: { type: String, required: true },
}, { timestamps: true, collection: 'services' });
exports.ServiceModel = (0, mongoose_1.model)('Service', exports.ServiceSchema);
//# sourceMappingURL=Services.schema.js.map