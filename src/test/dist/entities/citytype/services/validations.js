"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserType = void 0;
const getUserType = async (params) => {
    const { constants, data, model } = params;
    let userType = constants.ADMIN_UNIQUE_NUMBER;
    if (data.user_type_id && data.corporate_ids.lenght > 0) {
        const corporateData = await model
            .findOne({
            _id: data.user_type_id,
        })
            .select({ is_own_service_type: 1 })
            .lean();
        if (corporateData?.is_own_service_type == 1)
            userType = constants.CORPORATE_UNIQUE_NUMBER;
    }
    return { userType };
};
exports.getUserType = getUserType;
//# sourceMappingURL=validations.js.map