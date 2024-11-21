"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderDocumentModel = exports.ProviderDocumentSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ProviderDocumentSchema = new mongoose_1.Schema({
    document_id: { type: mongoose_1.Schema.Types.ObjectId },
    name: { type: String, default: '' },
    provider_id: { type: mongoose_1.Schema.Types.ObjectId },
    option: { type: Number, default: 0 },
    document_picture: { type: String, default: '' },
    is_uploaded: { type: Number, default: 0 },
    unique_code: { type: String, default: '' },
    is_unique_code: { type: Boolean, default: false },
    expired_date: { type: Date, default: Date.now },
    issue_date: { type: Date, default: Date.now },
    is_issue_date: { type: Boolean, default: false },
    is_degree: { type: Boolean, default: false },
    degree: { type: String, default: '' },
    is_expired_date: { type: Boolean, default: false },
    is_document_expired: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'provider_documents',
});
exports.ProviderDocumentSchema.index({ provider_id: 1, option: 1, is_uploaded: 1 }, { background: true });
exports.ProviderDocumentModel = (0, mongoose_1.model)('ProviderDocument', exports.ProviderDocumentSchema);
//# sourceMappingURL=ProviderDocument.schema.js.map