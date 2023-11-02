"use client";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAppSelector } from "@/store/store";
import type { Stat } from "@/types/TradeData";

interface ResultData {
  Date: string;
  "일별 거래 대금": number;
}

export default function StatisticsTotal() {
  const list = useAppSelector((state) => state.tradedatareducer);

  const allDate: any = list.map((e) =>
    e.Stats.map((item) => ({
      Date: item.Date,
      AvgPrice: item.AvgPrice,
      TradeCount: item.TradeCount,
    }))
  );
  const list2 = list;
  console.log(list2);
  let newar = [];
  let result = 0;
  let result10 = 0;
  let result11 = 0;
  let result12 = 0;
  let result13 = 0;
  let result14 = 0;
  let result15 = 0;
  list2.map((e) => e.Stats.map((i) => i.AvgPrice * i.TradeCount));
  for (let e of list2) {
    for (let i of e.Stats) {
      result += i.AvgPrice * i.TradeCount;
      if (e.Category === "재련") {
        result10 += i.AvgPrice * i.TradeCount;
      } else if (e.Category === "각인") {
        result11 += i.AvgPrice * i.TradeCount;
      } else if (e.Category === "음식") {
        result12 += i.AvgPrice * i.TradeCount;
      } else if (e.Category === "배템") {
        result13 += i.AvgPrice * i.TradeCount;
      } else if (e.Category === "생활") {
        result14 += i.AvgPrice * i.TradeCount;
      } else if (e.Category === "모험") {
        result15 += i.AvgPrice * i.TradeCount;
      }
    }
  }
  console.log(result10 / result);
  console.log(result11 / result);
  console.log(result12 / result);
  console.log(result13 / result);
  console.log(result14 / result);
  console.log(result15 / result);
  // 재련 각인 요리 배템 모험 생활 각 총합 따로
  const combinedData1: Stat[] = [].concat(...allDate);

  function calculateResult(combinedData: Stat[]): {
    [key: string]: number;
  } {
    const result: { [key: string]: number } = {};

    combinedData.forEach((item) => {
      const { Date, AvgPrice, TradeCount } = item;
      if (!result[Date]) {
        result[Date] = 0;
      }
      result[Date] += Math.floor(AvgPrice * TradeCount);
    });

    return result;
  }

  const result1 = calculateResult(combinedData1);

  const data: ResultData[] = Object.keys(result1).map((Date) => ({
    Date,
    "일별 거래 대금": result1[Date],
  }));

  const renderTooltipContent = (o: any): JSX.Element => {
    const { payload, label } = o;
    return (
      <div className="customized-tooltip-content">
        <p className="total">{`${label} `}</p>
        <ul className="list">
          {payload.map((entry: any, index: number) => (
            <li key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value.toLocaleString()} G`}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const CustomYAxisTick = (props: any): JSX.Element => {
    const { x, y, payload } = props;
    const value = payload.value;
    const formattedValue =
      value >= 1000000 ? `${(value / 1000000).toFixed(0)}백만` : value;
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
          {formattedValue}
        </text>
      </g>
    );
  };

  return (
    <div>
      <h1>일별 성장 재료 거래 대금</h1>
      <h6>거래대금=평균가*거래량</h6>
      <BarChart
        width={375}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" reversed={true} />
        <YAxis tick={<CustomYAxisTick />} />
        <Tooltip content={renderTooltipContent} />
        <Legend />
        <Bar dataKey="일별 거래 대금" fill="#8884d8" />
      </BarChart>
    </div>
  );
}
