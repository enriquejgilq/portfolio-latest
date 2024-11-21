"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoIncrementPlugin = void 0;
const autoIncrementPlugin = (schema, options) => {
    let counter = 1;
    schema.pre('save', function (next) {
        if (this.isNew) {
            this[options.field] = counter++;
        }
        next();
    });
};
exports.autoIncrementPlugin = autoIncrementPlugin;
//# sourceMappingURL=auto-increment.js.map