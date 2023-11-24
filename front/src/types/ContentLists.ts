//@\types\ContentLists.ts
export interface Item {
  Id: number;
  Category: String;
  Name: string;
  Grade: string;
  Icon: string;
  BundleCount: number;
  TradeRemainCount: number | null;
  YDayAvgPrice: number;
  RecentPrice: number;
  CurrentMinPrice: number;
  Quantity?: number;
  Quantity2?: number;
}
export interface ContentLists {
  _id?: string;
  Category: string;
  Title: string;
  List: Item[];
  ID?: any;
  __v?: number;
}
[];
