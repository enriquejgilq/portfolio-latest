import { DocumentsService } from './documents.service';
export declare class DocumentsController {
    private readonly documentsService;
    constructor(documentsService: DocumentsService);
    list(res: any, session: any): Promise<any>;
    listPage(req: any, res: any, session: any): Promise<any>;
    generateDocumentExcel(req: any, res: any, session: any): Promise<any>;
    addDocumentForm(res: any, session: any): Promise<any>;
    addDocumentDetails(req: any, res: any, session: any): Promise<any>;
}
