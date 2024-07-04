export type ExchangeRate = {
  currency: string;
  date: string;
  time: string;
  unit: number;
  buyRate: number;
  middleRate: number;
  salesRate: number;
  name: string | null;
  diffRate: number | null; // Assuming diffRate can be a number or null based on your data
};

export type ParamsType = {
  rateType: string;
  fromDate: string;
  toDate: string;
  from: number;
  size: number;
};

export type ExchangeRatesData = {
  total: number;
  from: number;
  size: number;
  exchangeRates: ExchangeRate[];
};
