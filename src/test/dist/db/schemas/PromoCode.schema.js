"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromoCodeModel = exports.PromoCodeSchema = void 0;
const mongoose_1 = require("mongoose");
exports.PromoCodeSchema = new mongoose_1.Schema({
    promocode: { type: String, default: '' },
    code_value: { type: Number, default: 0 },
    code_type: { type: Number, default: 0 },
    code_uses: { type: Number, default: 0 },
    user_used_promo: { type: Number, default: 0 },
    state: { type: Number, default: 0 },
    completed_trips_type: { type: Number, default: 0 },
    completed_trips_value: { type: Number, default: 0 },
    countryid: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Country' },
    cityid: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'City', default: [] }],
    start_date: { type: Date, default: Date.now },
    code_expiry: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'promo_codes',
});
exports.PromoCodeSchema.index({ promocode: 1, countryid: 1 }, { background: true });
exports.PromoCodeSchema.index({ state: 1, start_date: 1, code_expiry: 1 }, { background: true });
exports.PromoCodeSchema.index({ promocode: 1, code_expiry: 1 }, { background: true });
exports.PromoCodeModel = (0, mongoose_1.model)('PromoCode', exports.PromoCodeSchema);
//# sourceMappingURL=PromoCode.schema.js.map