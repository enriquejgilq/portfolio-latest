"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentTypeService = void 0;
const User_schema_1 = require("../../../db/schemas/User.schema");
const UserDocument_schema_1 = require("../../../db/schemas/UserDocument.schema");
const Provider_schema_1 = require("../../../db/schemas/Provider.schema");
const ProviderDocument_schema_1 = require("../../../db/schemas/ProviderDocument.schema");
const Partner_schema_1 = require("../../../db/schemas/Partner.schema");
const PartnerVehicleDocument_schema_1 = require("../../../db/schemas/PartnerVehicleDocument.schema");
const ProviderVehicleDocument_schema_1 = require("../../../db/schemas/ProviderVehicleDocument.schema");
const handler_1 = require("../../../db/handler");
class DocumentType {
    constructor() {
        this.specsType = Object.freeze({
            0: {
                excelHeader: 'title_user',
                models: {
                    getData: User_schema_1.UserModel,
                    setData: UserDocument_schema_1.UserDocumentModel,
                },
                props: {
                    name: 'title',
                    option: 'option',
                    document_picture: '',
                    unique_code: '',
                    expired_date: null,
                    is_unique_code: 'is_unique_code',
                    is_expired_date: 'is_expired_date',
                    is_uploaded: 0,
                },
                primaryKeyField: 'user_id',
            },
            1: {
                excelHeader: 'title_provider',
                models: {
                    getData: Provider_schema_1.ProviderModel,
                    setData: ProviderDocument_schema_1.ProviderDocumentModel,
                },
                props: {
                    name: 'title',
                    option: 'option',
                    document_picture: '',
                    unique_code: '',
                    expired_date: null,
                    degree: '',
                    issue_date: null,
                    is_degree: 'is_degree',
                    is_issue_date: 'is_issue_date',
                    is_unique_code: 'is_unique_code',
                    is_expired_date: 'is_expired_date',
                    is_uploaded: 0,
                },
                primaryKeyField: 'provider_id',
            },
            2: {
                excelHeader: 'title_provider_vehicle',
                models: {
                    getData: Partner_schema_1.PartnerModel,
                    setData: PartnerVehicleDocument_schema_1.PartnerVehicleDocumentModel,
                },
                props: {
                    name: 'title',
                    option: 'option',
                    document_picture: '',
                    unique_code: '',
                    expired_date: null,
                    is_unique_code: 'is_unique_code',
                    is_expired_date: 'is_expired_date',
                    is_uploaded: 0,
                },
                primaryKeyField: 'partner_id',
            },
        });
    }
    async processDocumentsDataByType({ type, filter, document }) {
        const handlerQueryGet = new handler_1.HandlerQuery(this.specsType[type].models.getData);
        const data = await handlerQueryGet.find(filter);
        if (!data.status) {
            return { status: false, msg: 'Error in find query' };
        }
        const entries = Object.entries(this.specsType[type].props);
        const records = data.records.map((record) => {
            const obj = {
                [this.specsType[type].primaryKeyField]: record._id,
                document_id: document._id,
            };
            entries.forEach(([key, value]) => {
                obj[key] = value ? document[value] ?? null : value;
            });
            if (type === 2) {
                return this.processDocumentPartnerVehicle({
                    obj,
                    vehicleDetail: record.vehicle_detail,
                });
            }
            return obj;
        });
        const handlerQuerySet = new handler_1.HandlerQuery(this.specsType[type].models.setData);
        const recordsSaved = await handlerQuerySet.insertMany(records);
        if (!recordsSaved.status) {
            return { status: false, msg: 'Error in insertMany query' };
        }
        return { status: true };
    }
    processDocumentPartnerVehicle({ obj, vehicleDetail }) {
        return vehicleDetail.map((vehicle) => {
            obj.vehicle_id = vehicle._id;
            return obj;
        });
    }
    getExcelHeaderByType({ type }) {
        return this.specsType[type].excelHeader;
    }
    async getDocumentAndUpdateById({ id, type, specs }) {
        try {
            const handlerQuery = new handler_1.HandlerQuery(this.specsType[type].models.setData);
            if (type != 2) {
                delete specs.is_degree;
            }
            const dataUpdated = await handlerQuery.insertMany(specs, {
                update: true,
                filter: { document_id: id },
            });
            if (!dataUpdated.status) {
                return { status: false, msg: 'Error in getDocumentAndUpdateById' };
            }
            if (type == 2) {
                const handlerQueryProviderVehicleDocument = new handler_1.HandlerQuery(ProviderVehicleDocument_schema_1.ProviderVehicleDocumentModel);
                const providerVehicleDocumentInserted = await handlerQueryProviderVehicleDocument.insertMany(specs, {
                    update: true,
                    filter: { document_id: id },
                });
                if (!providerVehicleDocumentInserted.status) {
                    return { status: false, msg: 'Error in getDocumentAndUpdateById' };
                }
            }
            return { status: dataUpdated.status };
        }
        catch (error) {
            console.error(error);
            return { status: false, msg: 'Error in getDocumentAndUpdateById' };
        }
    }
}
exports.documentTypeService = new DocumentType();
//# sourceMappingURL=document_type.js.map