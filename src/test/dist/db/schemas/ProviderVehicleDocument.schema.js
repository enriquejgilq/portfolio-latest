"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderVehicleDocumentModel = exports.ProviderVehicleDocumentSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ProviderVehicleDocumentSchema = new mongoose_1.Schema({
    document_id: { type: mongoose_1.Schema.Types.ObjectId },
    vehicle_id: { type: mongoose_1.Schema.Types.ObjectId },
    name: { type: String, default: '' },
    provider_id: { type: mongoose_1.Schema.Types.ObjectId },
    option: { type: Number, default: 0 },
    document_picture: { type: String, default: '' },
    is_uploaded: { type: Number, default: 0 },
    unique_code: { type: String, default: '' },
    expired_date: { type: Date, default: Date.now },
    is_unique_code: { type: Boolean, default: false },
    is_expired_date: { type: Boolean, default: false },
    is_document_expired: { type: Boolean, default: false },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'provider_vehicle_documents',
});
exports.ProviderVehicleDocumentSchema.index({ provider_id: 1, vehicle_id: 1 }, { background: true });
exports.ProviderVehicleDocumentSchema.index({ provider_id: 1, vehicle_id: 1, option: 1, is_uploaded: 1 }, { background: true });
exports.ProviderVehicleDocumentModel = (0, mongoose_1.model)('ProviderVehicleDocument', exports.ProviderVehicleDocumentSchema);
//# sourceMappingURL=ProviderVehicleDocument.schema.js.map