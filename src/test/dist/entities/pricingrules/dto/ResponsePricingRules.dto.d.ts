export declare class PricingRuleDto {
    id: string;
    policy_insurance_percentage: number;
}
export declare class ResponsePricingRulesDto {
    success: boolean;
    message?: string;
    data?: PricingRuleDto;
}
