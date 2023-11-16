"use client";
import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

import { useAppSelector } from "@/store/store";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#79F8F8",
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function StatisticsSummary() {
  const list = useAppSelector((state) => state.tradeDatareducer);
  // console.log(list);
  const date = list ? list[0]?.Stats?.length || 0 : 0;

  //카테고리별 각 stats 평균*거래량 총합.
  let Category = ["재련", "배템", "각인", "음식", "모험", "생활"];
  let result2 = 0;
  const lists2 = list.filter((i) => i.Category === "재련");
  lists2.forEach((i) =>
    i.Stats.forEach((e) => (result2 += e.AvgPrice * e.TradeCount))
  );
  let result3 = 0;
  const lists3 = list.filter((i) => i.Category === "배템");
  lists3.forEach((i) =>
    i.Stats.forEach((e) => (result3 += e.AvgPrice * e.TradeCount))
  );
  let result4 = 0;
  const lists4 = list.filter((i) => i.Category === "각인");
  lists4.forEach((i) =>
    i.Stats.forEach((e) => (result4 += e.AvgPrice * e.TradeCount))
  );
  let result5 = 0;
  const lists5 = list.filter((i) => i.Category === "음식");
  lists5.forEach((i) =>
    i.Stats.forEach((e) => (result5 += e.AvgPrice * e.TradeCount))
  );
  let result6 = 0;
  const lists6 = list.filter((i) => i.Category === "모험");
  lists6.forEach((i) =>
    i.Stats.forEach((e) => (result6 += e.AvgPrice * e.TradeCount))
  );
  let result7 = 0;
  const lists7 = list.filter((i) => i.Category === "생활");
  lists7.forEach((i) =>
    i.Stats.forEach((e) => (result7 += e.AvgPrice * e.TradeCount))
  );
  const data = [
    { name: "재련", value: result2 },
    { name: "베템", value: result3 },
    { name: "각인", value: result4 },
    { name: "음식", value: result5 },
    { name: "모험", value: result6 },
    { name: "생활", value: result7 },
  ];
  return (
    <div>
      <div className="text-2xl  "> 거래 대금 비중</div>
      <div>지난 {date}일동안</div>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx={140}
          cy={120}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: any) => (parseInt(value) / 1e6).toFixed(0) + "M G"}
        />
        <Legend />
      </PieChart>
    </div>
  );
}
