import { Controller, Get } from '@nestjs/common';
import { GetDashboardMetricsUseCase } from '@/domain/application/use-cases/dashboard/get-dashboard-metrics';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private getDashboardMetricsUseCase: GetDashboardMetricsUseCase,
  ) {}

  @Get('metrics')
  async getMetrics(): Promise<any> {
    const metrics = await this.getDashboardMetricsUseCase.execute();
    return metrics;
  }
}
