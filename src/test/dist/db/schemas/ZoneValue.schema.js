"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoneValueModel = exports.ZoneValueSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ZoneValueSchema = new mongoose_1.Schema({
    cityid: { type: mongoose_1.Schema.Types.ObjectId, ref: 'City', required: true },
    service_type_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'ServiceType',
        required: true,
    },
    from: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Location', required: true },
    to: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Location', required: true },
    amount: { type: Number, default: 0, required: true },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'zonevalues',
});
exports.ZoneValueSchema.index({ from: 1, to: 1 }, { background: true });
exports.ZoneValueModel = (0, mongoose_1.model)('ZoneValue', exports.ZoneValueSchema);
//# sourceMappingURL=ZoneValue.schema.js.map