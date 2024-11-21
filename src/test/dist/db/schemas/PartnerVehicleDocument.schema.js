"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnerVehicleDocumentModel = exports.PartnerVehicleDocumentSchema = void 0;
const mongoose_1 = require("mongoose");
exports.PartnerVehicleDocumentSchema = new mongoose_1.Schema({
    documentId: { type: mongoose_1.Schema.Types.ObjectId },
    vehicleId: { type: mongoose_1.Schema.Types.ObjectId },
    name: { type: String, default: '' },
    providerId: { type: mongoose_1.Schema.Types.ObjectId },
    option: { type: Number, default: 0 },
    documentPicture: { type: String, default: '' },
    isUploaded: { type: Number, default: 0 },
    uniqueCode: { type: String, default: '' },
    expiredDate: { type: Date, default: Date.now },
    isUniqueCode: { type: Boolean, default: false },
    isExpiredDate: { type: Boolean, default: false },
    isDocumentExpired: { type: Boolean, default: false },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'partner_vehicle_documents',
});
exports.PartnerVehicleDocumentSchema.index({ providerId: 1, vehicleId: 1 }, { background: true });
exports.PartnerVehicleDocumentSchema.index({ providerId: 1, vehicleId: 1, option: 1, isUploaded: 1 }, { background: true });
exports.PartnerVehicleDocumentModel = (0, mongoose_1.model)('PartnerVehicleDocument', exports.PartnerVehicleDocumentSchema);
//# sourceMappingURL=PartnerVehicleDocument.schema.js.map