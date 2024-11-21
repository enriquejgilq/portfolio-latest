"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorporateModel = void 0;
const mongoose_1 = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const auto_increment_1 = require("../auto-increment");
const corporateSchema = new mongoose_1.Schema({
    unique_id: { type: Number },
    company_name: { type: String, default: '' },
    rif: { type: String, default: '' },
    name: { type: String, default: '' },
    password: { type: String, default: '' },
    email: { type: String, default: '' },
    country_phone_code: { type: String, default: '' },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    country_id: { type: mongoose_1.Schema.Types.ObjectId },
    country_name: { type: String, default: '' },
    wallet_currency_code: { type: String, default: '' },
    customer_id: { type: String, default: '' },
    stripe_doc: { type: String, default: '' },
    account_id: { type: String, default: '' },
    bank_id: { type: String, default: '' },
    token: { type: String, default: '' },
    is_approved: { type: Number, default: 0 },
    wallet: { type: Number, default: 0 },
    refferal_code: { type: String, default: '' },
    last_transferred_date: { type: Date, default: Date.now },
    is_own_service_type: { type: Number, default: 0 },
    picture: { type: String, default: '' },
    rif_url: { type: String, default: '' },
    document_2: { type: String, default: '' },
    alt_phone: { type: String, default: '' },
    uid: { type: String },
    corporate_type_id: { type: mongoose_1.Schema.Types.ObjectId },
    corporate_type_userid: { type: mongoose_1.Schema.Types.ObjectId },
    url_array: { type: [String], default: [] },
    is_trip_approve: { type: Number, default: 0 },
    is_subcorporate_admin: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    active_api: { type: Boolean, default: false },
    api_key: { type: String, default: '' },
}, {
    timestamps: true,
    collection: 'corporates',
});
corporateSchema.index({ phone: 1 }, { background: true });
corporateSchema.index({ email: 1 }, { background: true });
corporateSchema.plugin(mongoosePaginate);
corporateSchema.plugin(auto_increment_1.autoIncrementPlugin, {
    model: 'Corporate',
    field: 'unique_id',
    startAt: 1,
    incrementBy: 1,
});
exports.CorporateModel = (0, mongoose_1.model)('Corporate', corporateSchema);
//# sourceMappingURL=Corporate.schema.js.map