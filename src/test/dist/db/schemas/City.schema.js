"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityModel = exports.CitySchema = void 0;
const mongoose_1 = require("mongoose");
exports.CitySchema = new mongoose_1.Schema({
    countryid: { type: mongoose_1.Schema.Types.ObjectId },
    countryname: { type: String, default: '' },
    full_cityname: { type: String, default: '' },
    timezone: { type: String, default: '' },
    cityname: { type: String, default: '' },
    is_use_city_boundary: { type: Boolean, default: false },
    city_locations: { type: Array, index: '3d', default: [] },
    payment_gateway: {
        type: [Number],
        index: '2d',
    },
    unit: { type: Number, default: 1 },
    is_payment_mode_cash: { type: Number, default: 1 },
    is_payment_mode_card: { type: Number, default: 1 },
    is_payment_mode_apple_pay: { type: Number, default: 0 },
    isPromoApplyForCash: { type: Number, default: 1 },
    isPromoApplyForCard: { type: Number, default: 1 },
    isBusiness: { type: Number, default: 1 },
    airport_business: { type: Number, default: 1 },
    city_business: { type: Number, default: 1 },
    zone_business: { type: Number, default: 1 },
    isCountryBusiness: { type: Number, default: 1 },
    destination_city: {
        type: [mongoose_1.Schema.Types.ObjectId],
        default: [],
    },
    citycode: { type: String, default: '' },
    cityLatLong: {
        type: [Number],
        index: '2d',
    },
    cityRadius: { type: Number, default: 50 },
    is_ask_user_for_fixed_fare: { type: Boolean, default: false },
    provider_min_wallet_amount_set_for_received_cash_request: {
        type: Number,
        default: 0,
    },
    is_check_provider_wallet_amount_for_received_cash_request: {
        type: Boolean,
        default: false,
    },
    is_provider_earning_set_in_wallet_on_cash_payment: {
        type: Boolean,
        default: false,
    },
    is_provider_earning_set_in_wallet_on_other_payment: {
        type: Boolean,
        default: false,
    },
    is_caracas: { type: Boolean, default: false },
    daily_cron_date: { type: Date },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'cities',
});
exports.CitySchema.index({ countryid: 1, isBusiness: 1 }, { background: true });
exports.CitySchema.index({ countryname: 1, isBusiness: 1 }, { background: true });
exports.CitySchema.index({ cityname: 1 }, { background: true });
exports.CitySchema.index({ created_at: 1, cityname: 1 }, { background: true });
exports.CitySchema.index({ countryid: 1 }, { background: true });
exports.CityModel = (0, mongoose_1.model)('City', exports.CitySchema);
//# sourceMappingURL=City.schema.js.map