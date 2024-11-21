"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeModelModel = exports.TypeModelSchema = void 0;
const mongoose_1 = require("mongoose");
const auto_increment_1 = require("../auto-increment");
exports.TypeModelSchema = new mongoose_1.Schema({
    unique_id: { type: Number },
    model_name: { type: String, default: '' },
    model_image_url: { type: String, default: '' },
    state: { type: Number, default: 0 },
    type_service_list: { type: [mongoose_1.Schema.Types.ObjectId], default: [] },
    sequence: { type: String, default: '' },
}, { timestamps: true, collection: 'type_models' });
exports.TypeModelSchema.index({ model_name: 1 }, { background: true });
exports.TypeModelSchema.plugin(auto_increment_1.autoIncrementPlugin, {
    model: 'TypeModel',
    field: 'unique_id',
    startAt: 1,
    incrementBy: 1,
});
exports.TypeModelModel = (0, mongoose_1.model)('TypeModel', exports.TypeModelSchema);
//# sourceMappingURL=TypeModel.schema.js.map