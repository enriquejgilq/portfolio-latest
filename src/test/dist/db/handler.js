"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandlerQuery = void 0;
class HandlerQuery {
    constructor(model) {
        this.model = model;
    }
    async aggregate(specs) {
        try {
            const records = await this.model.aggregate(Object.values(specs));
            return { status: true, records };
        }
        catch (error) {
            console.error('Error in aggregate query', error);
            return { status: false, error };
        }
    }
    async find(specs) {
        try {
            const records = await this.model.find(specs);
            return { status: true, records };
        }
        catch (error) {
            console.error('Error in find query', error);
            return { status: false, error };
        }
    }
    async insertMany(specs, { update, filter } = {}) {
        try {
            update
                ? await this.model.updateMany(filter, specs, { multi: true })
                : await this.model.insertMany(specs);
            return { status: true };
        }
        catch (error) {
            console.error('Error in insertMany query', error);
            return { status: false, error };
        }
    }
    async findById(model = null, { _id }) {
        try {
            const modelQuery = model ?? this.model;
            const record = await modelQuery.findById(_id).lean();
            if (!record) {
                return { status: false, error: 'Record not found' };
            }
            return { status: true, record };
        }
        catch (error) {
            console.error('Error in findById query', error);
            return { status: false, error };
        }
    }
}
exports.HandlerQuery = HandlerQuery;
//# sourceMappingURL=handler.js.map