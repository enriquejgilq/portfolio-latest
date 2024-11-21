"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityZoneModel = exports.CityZoneSchema = void 0;
const mongoose_1 = require("mongoose");
exports.CityZoneSchema = new mongoose_1.Schema({
    cityid: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    title: { type: String, default: '' },
    cityname: { type: String, default: '' },
    styleUrl: { type: String, default: '' },
    styleHash: { type: String, default: '' },
    description: { type: String, default: '' },
    stroke: { type: String, default: '' },
    stroke_opacity: { type: Number, default: 0 },
    stroke_width: { type: Number, default: 0 },
    fill: { type: String, default: '' },
    fill_opacity: { type: Number, default: 0 },
    total_provider_in_zone_queue: [
        { type: mongoose_1.Schema.Types.ObjectId, default: [] },
    ],
    kmlzone: {
        type: Array,
        index: '3d',
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'cityzones',
});
exports.CityZoneSchema.index({ cityid: 1, title: 1 }, { background: true });
exports.CityZoneModel = (0, mongoose_1.model)('CityZone', exports.CityZoneSchema);
//# sourceMappingURL=CityZone.schema.js.map