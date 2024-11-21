"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericException = void 0;
class GenericException extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
exports.GenericException = GenericException;
//# sourceMappingURL=generic-exception.js.map