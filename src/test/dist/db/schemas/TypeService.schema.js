"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeServiceModel = void 0;
const mongoose_1 = require("mongoose");
const auto_increment_1 = require("../auto-increment");
const TypeServiceSchema = new mongoose_1.Schema({
    unique_id: { type: Number },
    service_name: { type: String, default: '' },
    specification_array: { type: [mongoose_1.Schema.Types.ObjectId], default: [] },
    courier_type: { type: Number, default: 0 },
    state: { type: Number, default: 0 },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'type_services',
});
TypeServiceSchema.index({ service_name: 1 }, { background: true });
TypeServiceSchema.plugin(auto_increment_1.autoIncrementPlugin, {
    model: 'type_services',
    field: 'unique_id',
    startAt: 1,
    incrementBy: 1,
});
exports.TypeServiceModel = (0, mongoose_1.model)('TypeService', TypeServiceSchema);
//# sourceMappingURL=TypeService.schema.js.map