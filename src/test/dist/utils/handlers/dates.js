"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateHandler = void 0;
const dayjs = require("dayjs");
class DateHandler {
    currentDate() {
        return dayjs();
    }
    getStartDate(params) {
        const { startDateStr, typeDate } = params;
        return startDateStr
            ? dayjs(startDateStr).startOf(typeDate)
            : dayjs().startOf(typeDate);
    }
    getEndDate(params) {
        const { endDateStr, typeDate } = params;
        return endDateStr
            ? dayjs(endDateStr).endOf(typeDate)
            : dayjs().endOf(typeDate);
    }
}
exports.dateHandler = new DateHandler();
//# sourceMappingURL=dates.js.map