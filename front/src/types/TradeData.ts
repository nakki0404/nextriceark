export interface Stat {
  Date: string;
  AvgPrice: number;
  TradeCount: number;
}
[];
export interface TradeData {
  _id: string;
  Category: String;
  Name: string;
  TradeRemainCount: null;
  BundleCount: number;
  Stats: Stat[];
  __v: number;
}
[];
