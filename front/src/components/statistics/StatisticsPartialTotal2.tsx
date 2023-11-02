"use client";

import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAppSelector } from "@/store/store";
import type { Stat } from "@/types/TradeData";
// 데이터 1일당 총합 구하기
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    date: "20231102",
    재련: 3000,
    생활: 1398,
    모험: 2210,
    음식: 3000,
    각인: 1398,
    배템: 2210,
  },
];

export default function StatisticsPartialTotal2() {
  const lists = useAppSelector((state) => state.tradedatareducer);
  //stats 내부에 그날 합 객체를 추가한 배열을 얻어보자. list는 변경이 안된다일단.
  // let array: any = [];
  // lists.forEach((i) => {
  //   let array2: any = [];
  //   i.Stats.forEach((e) => {
  //     let obj2 = {
  //       AvgPrice: e.AvgPrice,
  //       Date: e.Date,
  //       TradeCount: e.TradeCount,
  //       Sum: e.AvgPrice * e.TradeCount,
  //     };
  //     array2.push(obj2);
  //   });
  //   let obj = {
  //     BundleCount: i.BundleCount,
  //     Category: i.Category,
  //     Name: i.Name,
  //     Stats: array2,
  //   };
  //   array.push(obj);
  // });
  // console.log(array);
  //같은 카테고리 가진 물건들 중에 같은 날짜의 거래 총액 합계.

  return (
    <LineChart width={300} height={100} data={data}>
      <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
    </LineChart>
  );
}
