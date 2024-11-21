"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnerModel = exports.PartnerSchema = void 0;
const mongoose_1 = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const mongoosePages = require("mongoose-pages");
exports.PartnerSchema = new mongoose_1.Schema({
    unique_id: { type: Number },
    first_name: { type: String, default: '' },
    last_name: { type: String, default: '' },
    rif: { type: String, default: '' },
    password: { type: String, default: '' },
    email: { type: String, default: '' },
    country_phone_code: { type: String, default: '' },
    phone: { type: String, default: '' },
    country: { type: String, default: '' },
    country_id: { type: mongoose_1.Schema.Types.ObjectId },
    wallet_currency_code: { type: String, default: '' },
    is_vehicle_document_uploaded: { type: Boolean, default: false },
    city_id: { type: mongoose_1.Schema.Types.ObjectId },
    vehicle_detail: { type: Array, default: [] },
    customer_id: { type: String, default: '' },
    stripe_doc: { type: String, default: '' },
    account_id: { type: String, default: '' },
    bank_id: { type: String, default: '' },
    account_number: { type: String, default: '' },
    bank_code: { type: String, default: '' },
    city: { type: String, default: '' },
    address: { type: String, default: '' },
    picture: { type: String, default: '' },
    token: { type: String, default: '' },
    partner_company_name: { type: String, default: '' },
    government_id_proof: { type: String, default: '' },
    is_approved: { type: Number, default: 0 },
    wallet: { type: Number, default: 0 },
    rif_url: { type: String, default: '' },
    document_2: { type: String, default: '' },
    refferal_code: { type: String, default: '' },
    uid: { type: String },
    webpush_config: { type: Object, default: {} },
    last_transferred_date: { type: Date, default: Date.now },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'partners',
});
exports.PartnerSchema.index({ phone: 1 }, { background: true });
exports.PartnerSchema.index({ email: 1 }, { background: true });
exports.PartnerSchema.plugin(mongoosePaginate);
mongoosePages.skip(exports.PartnerSchema);
exports.PartnerModel = (0, mongoose_1.model)('Partner', exports.PartnerSchema);
//# sourceMappingURL=Partner.schema.js.map