"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingRulesModel = exports.PricingRulesSchema = void 0;
const mongoose_1 = require("mongoose");
exports.PricingRulesSchema = new mongoose_1.Schema({
    policy_insurance_percentage: { type: Number, default: 0 },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'pricing_rules',
});
exports.PricingRulesModel = (0, mongoose_1.model)('PricingRules', exports.PricingRulesSchema);
//# sourceMappingURL=PricingRules.schema.js.map