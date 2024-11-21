"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const mongoosePages = require("mongoose-pages");
const auto_increment_1 = require("../auto-increment");
const UserSchema = new mongoose_1.Schema({
    unique_id: { type: Number },
    user_type: { type: Number },
    user_type_id: { type: mongoose_1.Schema.Types.ObjectId, default: null },
    first_name: { type: String, default: '' },
    last_name: { type: String, default: '' },
    email: { type: String, default: '' },
    country_phone_code: { type: String, default: '' },
    phone: { type: String, default: '' },
    gender: { type: String, default: '' },
    token: { type: String, default: '' },
    password: { type: String, default: '' },
    picture: { type: String, default: '' },
    device_token: { type: String, default: '' },
    device_type: { type: String, default: '' },
    corporate_ids: { type: [String], default: [] },
    bio: { type: String, default: '' },
    favourite_providers: { type: [mongoose_1.Schema.Types.ObjectId] },
    address: { type: String, default: '' },
    zipcode: { type: String, default: '' },
    social_unique_id: { type: String, default: '' },
    social_ids: { type: [String], default: [] },
    login_by: { type: String, default: '' },
    device_timezone: { type: String, default: '' },
    customer_id: { type: String, default: '' },
    city: { type: String, default: '' },
    is_document_uploaded: { type: Number, default: 1 },
    referred_by: { type: mongoose_1.Schema.Types.ObjectId, default: null },
    is_referral: { type: Number, default: 0 },
    country: { type: String, default: '' },
    total_referrals: { type: Number, default: 0 },
    refferal_credit: { type: Number, default: 0 },
    corporate_wallet_limit: { type: Number, default: 0 },
    wallet: { type: Number, default: 0 },
    wallet_currency_code: { type: String, default: '' },
    is_use_wallet: { type: Number, default: 0 },
    current_trip_id: { type: mongoose_1.Schema.Types.ObjectId, default: null },
    is_approved: { type: Number, default: 1 },
    promo_count: { type: Number, default: 0 },
    home_address: { type: String, default: '' },
    work_address: { type: String, default: '' },
    company_details: { type: Object, default: null },
    home_location: { type: [Number], index: '2d' },
    work_location: { type: [Number], index: '2d' },
    total_request: { type: Number, default: 0 },
    completed_request: { type: Number, default: 0 },
    img: { data: Buffer, contentType: String },
    cancelled_request: { type: Number, default: 0 },
    app_version: { type: String, default: '' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    referral_code: { type: String, default: '' },
    rate: { type: Number, default: 0 },
    rate_count: { type: Number, default: 0 },
    uid: { type: String },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
    collection: 'users',
});
UserSchema.index({ country: 1, is_approved: 1 }, { background: true });
UserSchema.index({ phone: 1, is_approved: 1 }, { background: true });
UserSchema.index({ email: 1, is_approved: 1 }, { background: true });
UserSchema.index({ social_unique_id: 1 }, { background: true });
UserSchema.index({ updated_at: 1 }, { background: true });
UserSchema.index({ referral_code: 1 }, { background: true });
UserSchema.index({ device_type: 1, unique_id: 1, device_token: 1 }, { background: true });
UserSchema.index({ referred_by: 1 }, { background: true });
UserSchema.plugin(mongoosePaginate);
UserSchema.plugin(auto_increment_1.autoIncrementPlugin, {
    model: 'User',
    field: 'unique_id',
    startAt: 1,
    incrementBy: 1,
});
mongoosePages.skip(UserSchema);
exports.UserModel = (0, mongoose_1.model)('User', UserSchema);
//# sourceMappingURL=User.schema.js.map