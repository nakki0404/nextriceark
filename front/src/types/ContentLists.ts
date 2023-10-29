//@\types\ContentLists.ts
export interface Item {
  Id: number;
  Name: string;
  Grade: string;
  Icon: string;
  BundleCount: number;
  TradeRemainCount: number | null;
  YDayAvgPrice: number;
  RecentPrice: number;
  CurrentMinPrice: number;
  Quantity: number;
  Quantity2: number;
}
export interface ContentLists {
  _id?: string;
  Title: string;
  List: Item[];
  totalprice: number;
  totalprice2: number;
  totalprice3: number;
  __v?: number;
}
[];
