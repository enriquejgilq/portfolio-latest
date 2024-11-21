"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDocumentModel = exports.UserDocumentSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserDocumentSchema = new mongoose_1.Schema({
    documentId: { type: mongoose_1.Schema.Types.ObjectId },
    name: { type: String, default: '' },
    userId: { type: mongoose_1.Schema.Types.ObjectId },
    option: { type: Number, default: 0 },
    documentPicture: { type: String, default: '' },
    isUploaded: { type: Number, default: 0 },
    uniqueCode: { type: String, default: '' },
    expiredDate: { type: Date, default: Date.now },
    isUniqueCode: { type: Boolean, default: false },
    isExpiredDate: { type: Boolean, default: false },
    isDocumentExpired: { type: Boolean, default: false },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    collection: 'user_documents',
});
exports.UserDocumentSchema.index({ userId: 1, option: 1, isUploaded: 1 }, { background: true });
exports.UserDocumentModel = (0, mongoose_1.model)('UserDocument', exports.UserDocumentSchema);
//# sourceMappingURL=UserDocument.schema.js.map