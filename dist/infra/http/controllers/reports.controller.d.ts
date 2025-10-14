import { GetSalesReportUseCase } from '@/domain/application/use-cases/reports/get-sales-report';
export declare class ReportsController {
    private getSalesReportUseCase;
    constructor(getSalesReportUseCase: GetSalesReportUseCase);
    getSalesReport(startDate?: string, endDate?: string, estagioId?: string): Promise<import("@/domain/application/use-cases/reports/get-sales-report").SalesReportResponse>;
}
