"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderModel = void 0;
const mongoose_1 = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const mongoosePages = require("mongoose-pages");
const auto_increment_1 = require("../auto-increment");
const ProviderSchema = new mongoose_1.Schema({
    provider_type: { type: Number, required: true },
    provider_type_id: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    unique_id: { type: Number, required: true },
    first_name: { type: String, default: '' },
    languages: [{ type: mongoose_1.Schema.Types.ObjectId }],
    received_trip_from_gender: [{ type: String }],
    is_trip: [{ type: mongoose_1.Schema.Types.ObjectId }],
    is_near_trip: [{ type: mongoose_1.Schema.Types.ObjectId }],
    is_near_available: { type: Number, default: 0 },
    is_go_home: { type: Number, default: 0 },
    is_ride_share: { type: Number, default: 0 },
    wallet: { type: Number, default: 0 },
    wallet_currency_code: { type: String, default: '' },
    last_name: { type: String, default: '' },
    email: { type: String, default: '' },
    gender: { type: String, default: '' },
    country_phone_code: { type: String, default: '' },
    customer_id: { type: String, default: '' },
    is_documents_expired: { type: Boolean, default: false },
    account_id: { type: String, default: '' },
    account_number: { type: String, default: '' },
    bank_code: { type: String, default: '' },
    bank_id: { type: String, default: '' },
    partner_name: { type: String, default: '' },
    is_vehicle_document_uploaded: { type: Boolean, default: false },
    phone: { type: String, default: '' },
    password: { type: String, default: '' },
    picture: { type: String, default: '' },
    token: { type: String, default: '' },
    service_type: { type: mongoose_1.Schema.Types.ObjectId },
    admintypeid: { type: mongoose_1.Schema.Types.ObjectId },
    car_model: { type: String, default: '' },
    car_number: { type: String, default: '' },
    device_token: { type: String, default: '' },
    device_type: { type: String, default: '' },
    app_version: { type: String, default: '' },
    bio: { type: String, default: '' },
    address: { type: String, default: '' },
    address_location: { type: [Number], index: '2d' },
    zipcode: { type: String, default: '' },
    social_unique_id: { type: String, default: '' },
    social_ids: [{ type: String, default: [] }],
    login_by: { type: String, default: '' },
    device_timezone: { type: String, default: '' },
    bearing: { type: Number, default: 0 },
    city: { type: String, default: '' },
    cityid: { type: mongoose_1.Schema.Types.ObjectId },
    country: { type: String, default: '' },
    country_id: { type: mongoose_1.Schema.Types.ObjectId },
    is_use_google_distance: { type: Boolean, default: false },
    vehicle_detail: { type: Array, default: [] },
    destinationLocation: { type: Array, default: [] },
    providerPreviousLocation: { type: [Number], index: '2d' },
    providerLocation: { type: [Number], index: '2d' },
    is_available: { type: Number, default: 0 },
    total_request: { type: Number, default: 0 },
    accepted_request: { type: Number, default: 0 },
    completed_request: { type: Number, default: 0 },
    cancelled_request: { type: Number, default: 0 },
    rejected_request: { type: Number, default: 0 },
    is_active: { type: Number, default: 0 },
    is_approved: { type: Number, default: 0 },
    is_partner_approved_by_admin: { type: Number, default: 0 },
    is_document_uploaded: { type: Number, default: 0 },
    device_unique_code: { type: String, default: '' },
    rate: { type: Number, default: 0 },
    rate_count: { type: Number, default: 0 },
    partner_ids: { type: Array, default: [] },
    start_online_time: { type: Date },
    referred_by: { type: mongoose_1.Schema.Types.ObjectId, default: null },
    is_referral: { type: Number, default: 1 },
    referral_code: { type: String, default: '' },
    total_referrals: { type: Number, default: 0 },
    provider_trip_dates: { type: Array, default: [] },
    is_truck_owner: { type: Number, default: 0 },
    zone_queue_id: { type: mongoose_1.Schema.Types.ObjectId },
    uid: { type: String },
    location_updated_time: { type: Date, default: Date.now },
    last_transferred_date: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
}, {
    strict: true,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
    collection: 'providers',
});
ProviderSchema.index({
    country: 1,
    service_type: 1,
    provider_type: 1,
    is_approved: 1,
    is_partner_approved_by_admin: 1,
}, { background: true });
ProviderSchema.index({ device_type: 1, unique_id: 1, device_token: 1 }, { background: true });
ProviderSchema.index({ country: 1 }, { background: true });
ProviderSchema.index({ email: 1 }, { background: true });
ProviderSchema.index({ provider_type_id: 1 }, { background: true });
ProviderSchema.index({ is_approved: 1, cityid: 1 }, { background: true });
ProviderSchema.index({ is_active: 1, is_trip: 1 }, { background: true });
ProviderSchema.index({ social_unique_id: 1 }, { background: true });
ProviderSchema.index({ phone: 1, country_phone_code: 1 }, { background: true });
ProviderSchema.index({
    providerLocation: 1,
    is_active: 1,
    is_available: 1,
    is_vehicle_document_uploaded: 1,
}, { background: true });
ProviderSchema.plugin(mongoosePaginate);
ProviderSchema.plugin(auto_increment_1.autoIncrementPlugin, {
    model: 'Provider',
    field: 'unique_id',
    startAt: 1,
    incrementBy: 1,
});
mongoosePages.skip(ProviderSchema);
exports.ProviderModel = (0, mongoose_1.model)('Provider', ProviderSchema);
//# sourceMappingURL=Provider.schema.js.map