import { Controller, Get, Query } from '@nestjs/common';
import { GetSalesReportUseCase } from '@/domain/application/use-cases/reports/get-sales-report';

@Controller('reports')
export class ReportsController {
  constructor(private getSalesReportUseCase: GetSalesReportUseCase) {}

  @Get('sales')
  async getSalesReport(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('estagioId') estagioId?: string,
  ) {
    const filters = {
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      estagioId: estagioId || undefined,
    };

    const report = await this.getSalesReportUseCase.execute(filters);

    return report;
  }
}
