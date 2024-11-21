import * as dayjs from 'dayjs';
declare class DateHandler {
    currentDate(): dayjs.Dayjs;
    getStartDate(params: any): dayjs.Dayjs;
    getEndDate(params: any): dayjs.Dayjs;
}
export declare const dateHandler: DateHandler;
export {};
