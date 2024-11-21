"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentModel = exports.DocumentSchema = void 0;
const mongoose_1 = require("mongoose");
exports.DocumentSchema = new mongoose_1.Schema({
    unique_id: { type: Number, required: true },
    countryid: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    title: { type: String, default: '' },
    type: { type: Number, default: 8 },
    option: { type: Number, default: 0 },
    expired_date: { type: Date },
    issue_date: { type: Date, default: Date.now },
    is_issue_date: { type: Boolean, default: false },
    is_degree: { type: Boolean, default: false },
    degree: { type: String, default: '' },
    is_unique_code: { type: Boolean, default: false },
    is_expired_date: { type: Boolean, default: false },
    document_for: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
}, { timestamps: true, collection: 'documents' });
exports.DocumentSchema.index({ countryid: 1, type: 1 }, { background: true });
exports.DocumentSchema.index({ title: 1, created_at: 1 }, { background: true });
exports.DocumentModel = (0, mongoose_1.model)('Document', exports.DocumentSchema);
//# sourceMappingURL=Document.schema.js.map