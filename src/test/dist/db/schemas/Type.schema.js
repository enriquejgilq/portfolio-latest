"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeModel = exports.TypeSchema = void 0;
const mongoose_1 = require("mongoose");
exports.TypeSchema = new mongoose_1.Schema({
    typename: { type: String, default: '' },
    typename2: { type: String, default: '' },
    description: { type: String, default: '' },
    typeImageUrl: { type: String, default: '' },
    mapPinImageUrl: { type: String, default: '' },
    panelMapPinImageUrl: { type: String, default: '' },
    serviceType: { type: Number, default: 0 },
    priority: { type: Number, default: 0 },
    isBusiness: { type: Number, default: 1 },
    isDefaultSelected: { type: Boolean, default: false },
    rideShareLimit: { type: Number, default: 2 },
    typeModelList: { type: [mongoose_1.Schema.Types.ObjectId], default: [] },
    typeServiceList: { type: [mongoose_1.Schema.Types.ObjectId], default: [] },
    typeCapacityList: { type: [mongoose_1.Schema.Types.ObjectId], default: [] },
    isUseModel: { type: Number, default: 1 },
    sequence: { type: String, default: '' },
    isUseCapacity: { type: Number, default: 1 },
    isUseServices: { type: Number, default: 1 },
    isUseSpecification: { type: Number, default: 0 },
    modelType: { type: Number },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    collection: 'types',
});
exports.TypeSchema.index({ typename: 1 }, { background: true });
exports.TypeModel = (0, mongoose_1.model)('Type', exports.TypeSchema);
//# sourceMappingURL=Type.schema.js.map