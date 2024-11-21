"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const fs = require("fs");
const path_1 = require("path");
const handler_1 = require("../../db/handler");
const dates_1 = require("../../utils/handlers/dates");
const excel_1 = require("../../utils/handlers/excel");
const document_type_1 = require("./services/document_type");
const admin_panel_string_1 = require("../../utils/constants/admin_panel_string");
let DocumentsService = class DocumentsService {
    constructor(documentModel, countryModel) {
        this.documentModel = documentModel;
        this.countryModel = countryModel;
        this.valuesDefault = {
            searchItem: 'title',
            searchValue: '',
            order: -1,
            fieldOrder: 'unique_id',
        };
        this.specsQuery = {
            lookup: {
                $lookup: {
                    from: 'countries',
                    localField: 'countryid',
                    foreignField: '_id',
                    as: 'country_detail',
                },
            },
            unwind: { $unwind: '$country_detail' },
            group: {
                $group: {
                    _id: null,
                    total: { $sum: 1 },
                    data: { $push: '$data' },
                },
            },
        };
    }
    setValuesDefault(values) {
        const searchItem = values?.search_item ?? this.valuesDefault.searchItem;
        const searchValue = values?.search_item != undefined
            ? values?.search_value ?? this.valuesDefault.searchValue
            : this.valuesDefault.searchValue;
        const order = values?.search_item != undefined && values?.sort_item?.length
            ? values?.sort_item[1]
            : this.valuesDefault.order;
        const fieldOrder = values?.search_item != undefined && values?.sort_item?.length
            ? values?.sort_item[0]
            : this.valuesDefault.fieldOrder;
        const startDateStr = values?.search_item != undefined ? values?.start_date ?? '' : '';
        const endDateStr = values?.search_item != undefined ? values?.end_date ?? '' : '';
        const startDate = dates_1.dateHandler.getStartDate({
            startDateStr,
            typeDate: 'day',
        });
        const endDate = dates_1.dateHandler.getEndDate({
            endDateStr,
            typeDate: 'day',
        });
        const size = values?.limit ?? 10;
        const valueText = searchValue
            .replace(/^\s+|\s+$/g, '')
            .replace(/ +(?= )/g, '');
        const value = new RegExp(valueText, 'i');
        return {
            searchItem,
            searchValue,
            order,
            fieldOrder,
            startDate,
            endDate,
            startDateStr,
            endDateStr,
            size,
            value,
        };
    }
    setPage({ page }) {
        const currentPage = page ?? 0;
        const next = currentPage + 1;
        const prev = currentPage == 0 ? 0 : currentPage - 1;
        return {
            page: currentPage,
            next,
            prev,
        };
    }
    async getDocuments(params, res) {
        const { page, next, prev } = this.setPage(params?.body);
        const { searchItem, searchValue, order, fieldOrder, startDate, endDate, startDateStr, endDateStr, size, value, } = this.setValuesDefault(params?.body);
        const search = {
            $match: {
                [searchItem]: {
                    $regex: value,
                },
            },
        };
        const filter = {
            $match: {
                created_at: {
                    $gte: startDate.toDate(),
                    $lt: endDate.toDate(),
                },
            },
        };
        try {
            const specs = {
                search,
                filter,
                ...this.specsQuery,
            };
            const response = {
                sort_field: fieldOrder,
                sort_order: order,
                search_item: searchItem,
                search_value: searchValue,
                filter_start_date: startDateStr,
                filter_end_date: endDateStr,
                status: true,
            };
            const handlerQuery = new handler_1.HandlerQuery(this.documentModel);
            const documentsData = await handlerQuery.aggregate(specs);
            if (!documentsData.status)
                return res
                    .status(common_1.HttpStatus.BAD_REQUEST)
                    .json({ status: false, message: 'BAD_REQUEST' });
            let documents = documentsData.records;
            if (!documents || documents.length == 0) {
                response['detail'] = [];
                response['current_page'] = 1;
                response['pages'] = 0;
                response['next'] = 1;
                response['pre'] = 0;
                return res.status(common_1.HttpStatus.OK).json(response);
            }
            const pages = Math.ceil(documents[0].total / size);
            delete specs.group;
            specs['sort'] = {
                $sort: {
                    [fieldOrder]: order,
                },
            };
            specs['skip'] = {
                $skip: page * size,
            };
            specs['limit'] = {
                $limit: size,
            };
            const documentsDataWithPage = await handlerQuery.aggregate(specs);
            if (!documentsDataWithPage.status)
                return res
                    .status(common_1.HttpStatus.BAD_REQUEST)
                    .json({ status: false, message: 'NO_DOCUMENTS' });
            documents = documentsDataWithPage.records;
            response['detail'] = documents;
            response['current_page'] = page;
            response['pages'] = pages;
            response['next'] = next;
            response['pre'] = prev;
            return res.status(common_1.HttpStatus.OK).json(response);
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: 'Internal Server Error',
            });
        }
    }
    async generateDocumentExcel(params, res) {
        const { searchItem, startDate, endDate, value } = this.setValuesDefault(params?.body);
        const search = {
            $match: {
                [searchItem]: {
                    $regex: value,
                },
            },
        };
        const filter = {
            $match: {
                created_at: {
                    $gte: startDate.toDate(),
                    $lt: endDate.toDate(),
                },
            },
        };
        try {
            const specs = {
                search,
                filter,
                ...this.specsQuery,
            };
            const handlerQuery = new handler_1.HandlerQuery(this.documentModel);
            const documentsData = await handlerQuery.aggregate(specs);
            if (!documentsData.status)
                return res
                    .status(common_1.HttpStatus.BAD_REQUEST)
                    .json({ status: false, message: 'NO_DOCUMENTS' });
            const documents = documentsData.records;
            const excelHandler = new excel_1.ExcelHandler();
            const headerHarcoded = [
                admin_panel_string_1.adminPanelString['title_id'],
                admin_panel_string_1.adminPanelString['title_name'],
                admin_panel_string_1.adminPanelString['title_country'],
                admin_panel_string_1.adminPanelString['title_type'],
                admin_panel_string_1.adminPanelString['title_option'],
            ];
            const wb = excelHandler.addSheet('sheet1');
            excelHandler.addHeaderCells('sheet1', headerHarcoded);
            documents.forEach((value, index) => {
                let col = 1;
                wb.getRow(index + 2).getCell(col++).value = value.unique_id;
                wb.getRow(index + 2).getCell(col++).value = value.title;
                wb.getRow(index + 2).getCell(col++).value =
                    value.country_detail.countryname;
                wb.getRow(index + 2).getCell(col++).value =
                    document_type_1.documentTypeService.getExcelHeaderByType({ type: value.type });
                wb.getRow(index + 2).getCell(col++).value = value.option
                    ? admin_panel_string_1.adminPanelString['title_mandatory']
                    : admin_panel_string_1.adminPanelString['title_optional'];
            });
            const currentDate = dates_1.dateHandler.currentDate();
            const currentTime = currentDate.valueOf();
            const staticRoot = `static/data/xlsheet/${currentTime}_document.xlsx`;
            const filePath = (0, path_1.resolve)(`src/${staticRoot}`);
            await excelHandler.save(filePath);
            const url = `${params?.metadata?.protocol ?? 'http'}://${params?.metadata?.host}/${staticRoot}`;
            setTimeout(function () {
                fs.unlink(filePath, function () { });
            }, 10000);
            return res.status(common_1.HttpStatus.OK).json({ status: true, url });
        }
        catch (error) {
            console.error(error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: 'Internal Server Error',
            });
        }
    }
    async addDocumentForm(params, res) {
        try {
            const dataContries = await this.countryModel.find().exec();
            return res.status(common_1.HttpStatus.OK).json({ status: true, dataContries });
        }
        catch (error) {
            console.error(error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: 'Internal Server Error',
            });
        }
    }
    async addDocumentDetails(params, res) {
        try {
            const isUniqueCode = params.body.is_unique_code;
            const isExpiredDate = params.body.is_expired_date;
            const isDegree = params.body.isDegree;
            const isIssueDate = params.body.is_issue_date;
            const countryData = await this.countryModel.findOne({
                _id: params.body.countryid,
            });
            if (!countryData)
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    status: false,
                    message: 'error',
                    data: 'Country not found',
                });
            const documentDataToCount = await this.documentModel
                .findOne({})
                .lean()
                .select({ unique_id: 1 })
                .sort({ _id: -1 });
            const documentCount = documentDataToCount
                ? documentDataToCount.unique_id + 1
                : 1;
            const document = new this.documentModel({
                unique_id: documentCount,
                title: params.body.title,
                countryid: params.body.countryid,
                type: params.body.type,
                option: params.body.option,
                is_unique_code: isUniqueCode,
                is_expired_date: isExpiredDate,
                is_degree: isDegree,
                is_issue_date: isIssueDate,
                data: params.body.data,
            });
            await document.save();
            const countryName = countryData.countryname.trim();
            const documentsSaved = await document_type_1.documentTypeService.processDocumentsDataByType({
                type: params.body.type,
                filter: { country: countryName },
                document,
            });
            if (!documentsSaved.status)
                return res
                    .status(common_1.HttpStatus.BAD_REQUEST)
                    .json({ status: false, message: 'error' });
            return res.status(common_1.HttpStatus.OK).json({ status: false });
        }
        catch (error) {
            console.error(error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: 'Internal Server Error',
            });
        }
    }
    async editDocumentForm(params, res) {
        try {
            const documentId = params.body.id;
            const document = await this.documentModel.findById(documentId).exec();
            const country_data = await this.countryModel
                .findById(document.countryid)
                .exec();
            return res
                .status(common_1.HttpStatus.OK)
                .json({ status: true, document, country_data });
        }
        catch (error) {
            console.error(error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: 'Internal Server Error',
            });
        }
    }
    async updateDocumentDetail(params, res) {
        const specs = {
            name: params?.body?.title,
            option: Number(params?.body?.option),
            is_unique_code: params?.body?.is_unique_code ?? 'false',
            is_expired_date: params?.body?.is_expired_date ?? 'false',
            is_issue_date: params?.body?.is_issue_date ?? 'false',
            is_degree: params?.body?.is_degree ?? 'false',
        };
        const id = params?.body?.id;
        const document = await this.documentModel.findByIdAndUpdate({ _id: id }, specs);
        if (!document)
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                status: false,
                message: 'error',
                data: 'Document not found',
            });
        const documentsUpdated = await document_type_1.documentTypeService.getDocumentAndUpdateById({
            id,
            type: document.type,
            specs,
        });
        if (!documentsUpdated.status)
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json({ status: false, message: 'Documents was not updated' });
        return res.status(common_1.HttpStatus.OK).json({ status: true });
    }
    async findDocumentByCountry(params, res) {
        try {
            const document = await this.documentModel
                .findOne({
                countryid: params.body.country,
                title: params.body.title.trim(),
                type: params.body.type,
                _id: { $ne: params.body.id },
            })
                .exec();
            if (document)
                return res.json({
                    status: false,
                    message: 'error_message_document_already_added_for_country',
                });
            return res.json({ status: true });
        }
        catch (error) {
            console.error(error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: 'Internal Server Error',
            });
        }
    }
};
exports.DocumentsService = DocumentsService;
exports.DocumentsService = DocumentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Document')),
    __param(1, (0, mongoose_1.InjectModel)('Country')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], DocumentsService);
//# sourceMappingURL=documents.service.js.map