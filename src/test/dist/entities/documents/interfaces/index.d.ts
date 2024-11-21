export interface IDocumentsDefault {
    searchItem: string;
    searchValue: string;
    order: number;
    fieldOrder: string;
}
export interface IPage {
    page?: number;
}
export interface IPageResponse {
    page: number;
    next: number;
    prev: number;
}
export interface IValuesRequest {
    search_item?: string;
    search_value?: string;
    sort_item?: any;
    start_date?: string;
    end_date?: string;
    limit?: number;
}
export interface IValuesResponse {
    searchItem: string;
    searchValue: string;
    order: number;
    fieldOrder: string;
    startDate: any;
    endDate: any;
    startDateStr: string;
    endDateStr: string;
    size: number;
    value: any;
}
