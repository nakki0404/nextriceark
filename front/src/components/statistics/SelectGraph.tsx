"use client";

import React, { useState, useEffect } from "react";
// import Image from "./images/monegi.jpg";
import Select from "react-select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import { useAppSelector } from "@/store/store";
import type { Stat } from "@/types/TradeData";

export default function SelectGraph() {
  type selectedOption =
    | {
        label: string;
        value: Stat[];
      }
    | undefined;

  const lists = useAppSelector((state) => state.tradeDatareducer);
  const list: { label: string; value: Stat[] }[] = lists.map((e) => ({
    label: e.Name,
    value: e.Stats,
  }));
  const [selectedOption, setSelectedOption] =
    useState<selectedOption>(undefined);
  const [data, setData] = useState<Stat[]>([]);

  useEffect(() => {
    if (selectedOption) {
      // 선택한 항목의 value 값을 data로 설정
      setData(selectedOption.value);
    }
  }, [selectedOption]);

  const handleChange = (selected: any) => {
    setSelectedOption(selected);
  };

  const CustomYAxisTick = (props: any) => {
    const { x, y, payload } = props;
    const value: number = payload.value;

    // 1000 이상일 때 'k'를 붙이도록 조건 처리
    const formattedValue =
      value >= 10000 ? `${(value / 10000).toFixed(0)}만` : value;
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
      <div className="container">
        <h1>단일 품목 검색</h1>
        <Select
          options={list}
          value={selectedOption}
          onChange={handleChange}
          isSearchable={true} // 검색 가능한 드롭다운으로 설정
          placeholder="재화를 선택하세요"
        />
      </div>
      <LineChart
        width={375}
        height={300}
        data={data}
        syncId="anyId"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: -30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" tick={undefined} reversed={true} />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="AvgPrice"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </LineChart>

      <AreaChart
        width={375}
        height={150}
        data={data}
        syncId="anyId"
        margin={{
          top: 0,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" reversed={true} />
        <YAxis tick={<CustomYAxisTick />} />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="TradeCount"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
      </AreaChart>
    </div>
  );
}
