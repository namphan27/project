import { prisma } from "../../utils/prisma";

export interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
}

export const dashboardService = {
  async getOverview(): Promise<DashboardStats> {
    const [totalUsers, totalOrders, revenueResult] = await Promise.all([
      prisma.user.count(),
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: {
          total: true, 
        },
      }),
    ]);

    const totalRevenue = revenueResult._sum.total ?? 0;
    return {
      totalUsers,
      totalOrders,
      totalRevenue: Number(totalRevenue),
    };
  },
};