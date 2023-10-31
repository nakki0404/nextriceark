export interface Stat {
  Date: string;
  AvgPrice: number;
  TradeCount: number;
}
[];
export interface TradeData {
  _id: string;
  Name: string;
  TradeRemainCount: null;
  BundleCount: number;
  Stats: Stat[];
  __v: number;
}
[];

export interface TradeAllData {
  ItemClass: string;
  Itemtrading_data: TradeData[];
}
[];
