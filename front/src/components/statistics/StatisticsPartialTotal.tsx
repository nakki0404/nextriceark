"use client";
import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAppSelector } from "@/store/store";
import type { TradeData } from "@/types/TradeData";
import type { Stat } from "@/types/TradeData";

interface ResultData {
  Date: string;
  "1340~": number;
  "1490~": number;
  "1580~": number;
}

const toPercent = (decimal: number, fixed = 0): string =>
  `${(decimal * 100).toFixed(fixed)}%`;

const getPercent = (value: number, total: number): string => {
  const ratio = total > 0 ? value / total : 0;
  return toPercent(ratio, 2);
};

const renderTooltipContent = (o: any): JSX.Element => {
  const { payload, label } = o;
  const total = payload.reduce(
    (result: number, entry: any) => result + entry.value,
    0
  );
  const formattedTotal = total.toLocaleString();
  return (
    <div className="customized-tooltip-content">
      <p className="total">{`${label} (Total: ${formattedTotal}) G`}</p>
      <ul className="list">
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value.toLocaleString()} G (${getPercent(
              entry.value,
              total
            )})`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function StatisticsPartialTotal() {
  const list = useAppSelector((state) => state.tradedatareducer);

  function calculateResults(indices: number[]): any {
    indices.map((index) =>
      list[index].Stats.map((item) => ({
        Date: item.Date,
        AvgPrice: item.AvgPrice,
        TradeCount: item.TradeCount,
      }))
    );
  }

  const items = list;
  const indices1: number[] = [];
  const indices2: number[] = [];
  const indices3: number[] = [];

  items.forEach((item, index) => {
    // Adjust the conditions based on your actual data structure
    if (
      item.Name === "수호석 결정" ||
      item.Name === "파괴석 결정" ||
      // Add other conditions as needed
      item.Name === "최상급 오레하 융화 재료"
    ) {
      indices1.push(index);
    } else if (
      item.Name === "수호강석" ||
      item.Name === "파괴강석" ||
      // Add other conditions as needed
      item.Name === "상급 오레하 융화 재료"
    ) {
      indices2.push(index);
    } else if (
      item.Name === "정제된 수호강석" ||
      item.Name === "정제된 파괴강석" ||
      // Add other conditions as needed
      item.Name === "최상급 오레하 융화 재료"
    ) {
      indices3.push(index);
    }
  });

  const combinedData1 = [].concat(...calculateResults(indices1));
  const combinedData2 = [].concat(...calculateResults(indices2));
  const combinedData3 = [].concat(...calculateResults(indices3));

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
  const result2 = calculateResult(combinedData2);
  const result3 = calculateResult(combinedData3);

  const data: ResultData[] = Object.keys(result1).map((Date) => ({
    Date,
    "1340~": result1[Date],
    "1490~": result2[Date],
    "1580~": result3[Date],
  }));

  return (
    <div>
      <h1>구간별 재련 재료 거래 대금</h1>
      <h6>명파, 숨결을 제외</h6>
      <AreaChart
        width={375}
        height={300}
        data={data}
        stackOffset="expand"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" reversed={true} />
        <YAxis
          ticks={[0, 0.25, 0.5, 0.75, 1]}
          tickFormatter={(value) => `${Math.round(value * 100)}%`}
        />
        <Tooltip content={renderTooltipContent} />
        <Legend />
        <Area
          type="monotone"
          dataKey="1340~"
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Area
          type="monotone"
          dataKey="1490~"
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
        <Area
          type="monotone"
          dataKey="1580~"
          stackId="1"
          stroke="#ffc658"
          fill="#ffc658"
        />
      </AreaChart>
    </div>
  );
}
