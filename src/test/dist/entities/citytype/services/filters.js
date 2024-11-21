"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filtersCityType = void 0;
exports.filtersCityType = {
    modelsType: {
        $lookup: {
            from: 'type_models',
            let: { models: '$type_details.type_model_list' },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [{ $in: ['$_id', '$$models'] }, { $eq: ['$state', 1] }],
                        },
                    },
                },
                {
                    $lookup: {
                        from: 'type_services',
                        let: { services: '$type_service_list' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $in: ['$_id', '$$services'] },
                                            { $eq: ['$state', 1] },
                                        ],
                                    },
                                },
                            },
                            {
                                $lookup: {
                                    from: 'service_specifications',
                                    let: { specifiactions: '$specification_array' },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $and: [
                                                        { $in: ['$_id', '$$specifiactions'] },
                                                        { $eq: ['$state', 1] },
                                                    ],
                                                },
                                            },
                                        },
                                    ],
                                    as: 'specification_details',
                                },
                            },
                        ],
                        as: 'type_service_details',
                    },
                },
            ],
            as: 'type_model_details',
        },
    },
    capacityType: {
        $lookup: {
            from: 'type_capacities',
            let: { capacities: '$type_details.type_capacity_list' },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [{ $in: ['$_id', '$$capacities'] }, { $eq: ['$state', 1] }],
                        },
                    },
                },
                { $sort: { value: 1 } },
            ],
            as: 'type_capacity_details',
        },
    },
};
//# sourceMappingURL=filters.js.map