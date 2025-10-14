import { GetDashboardMetricsUseCase } from '@/domain/application/use-cases/dashboard/get-dashboard-metrics';
export declare class DashboardController {
    private getDashboardMetricsUseCase;
    constructor(getDashboardMetricsUseCase: GetDashboardMetricsUseCase);
    getMetrics(): Promise<any>;
}
