"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedZoneAreaModel = exports.RedZoneAreaSchema = void 0;
const mongoose_1 = require("mongoose");
exports.RedZoneAreaSchema = new mongoose_1.Schema({
    cityid: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    title: { type: String, default: '' },
    styleUrl: { type: String, default: '' },
    styleHash: { type: String, default: '' },
    description: { type: String, default: '' },
    stroke: { type: String, default: '' },
    stroke_opacity: { type: Number, default: 0 },
    stroke_width: { type: Number, default: 0 },
    fill: { type: String, default: '' },
    fill_opacity: { type: Number, default: 0 },
    kmlzone: { type: Array, index: '3d' },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'redzoneareas',
});
exports.RedZoneAreaSchema.index({ cityid: 1, title: 1 }, { background: true });
exports.RedZoneAreaModel = (0, mongoose_1.model)('RedZoneArea', exports.RedZoneAreaSchema);
//# sourceMappingURL=RedZoneArea.schema.js.map