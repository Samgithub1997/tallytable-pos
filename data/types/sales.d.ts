export interface SalesSummary {
  dateRange: string;
  netSales: number;
  totalGuests: number;
  averageGuestSpend: number;
  totalPayments: number;
  depositSalesCollected?: number;
}

export interface CategorySales {
  categoryName: string;
  itemsSold: number;
  netSales: number;
}

export interface PaymentBreakdown {
  paymentType: string;
  count: number;
  amount: number;
  tips: number;
  gratuity: number;
}

export interface RevenueCenter {
  revenueCenterName: string;
  orders: number;
  netSales: number;
}

export interface DiningOption {
  diningOption: string;
  orders: number;
  netSales: number;
}

export interface DailyRevenue {
  date: string;
  revenue: number;
}

export interface ComparativeData {
  location: string;
  sales: number;
}

export interface ProductMixReport {
  menuItem: string;
  onlineSales: number;
  inStoreSales: number;
}

export interface SalesReport {
  summary: SalesSummary;
  categories: CategorySales[];
  paymentBreakdowns: PaymentBreakdown[];
  revenueCenters: RevenueCenter[];
  diningOptions: DiningOption[];
  expectedCloseoutCash: number;
  actualCloseoutCash: number;
  cashOverageShortage: number;
  gratuityTotal: number;
  tipsTotal: number;
  depositOverageShortage: number;
  dailyRevenues: DailyRevenue[];
  comparativeSales: ComparativeData[];
  productMix: ProductMixReport[];
}
