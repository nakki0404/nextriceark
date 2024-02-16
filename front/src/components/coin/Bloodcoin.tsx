"use client";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/store/store";
import bloodcoin from "@/asset/data/bloodcoin.json";
import cube from "@/asset/data/cube.json";
import Select from "react-select";
export default function Bloodcoin() {
  const list = useAppSelector((state) => state.marketItemsreducer);

  let subboxprice = 0;
  const matchingItem3 = list.find((item) => item.Name === "태양의 축복");
  const matchingItem4 = list.find((item) => item.Name === "태양의 가호");
  const matchingItem5 = list.find((item) => item.Name === "태양의 은총");
  if (matchingItem3 && matchingItem4 && matchingItem5) {
    subboxprice +=
      0.247 * matchingItem3.YDayAvgPrice +
      0.03 * matchingItem4.YDayAvgPrice +
      0.723 * matchingItem5.YDayAvgPrice;
  }
  const subbox = [
    {
      Name: "태양의 보조재 상자",
      YDayAvgPrice: subboxprice,
      _id: "a",
      Id: 0,
      Grade: "a",
      Icon: "a",
      BundleCount: 1,
      TradeRemainCount: 0,
      RecentPrice: 0,
      CurrentMinPrice: 0,
      __v: 0,
    },
  ];

  const cubedata = cube;
  let fixedcubedata = cubedata.map((e) => {
    let Price = 0;
    for (let i = 0; i < e.목록.length; i++) {
      const matchingItem2 = list.find((item) => item.Name === e.목록[i].이름);
      if (matchingItem2) {
        Price +=
          (e.목록[i].개수 * matchingItem2.YDayAvgPrice) /
          matchingItem2.BundleCount;
      }
    }
    return {
      Name: e.상자,
      YDayAvgPrice: Price * 0.2,
      _id: "a",
      Id: 0,
      Grade: "a",
      Icon: "a",
      BundleCount: 1,
      TradeRemainCount: 0,
      RecentPrice: 0,
      CurrentMinPrice: 0,
      __v: 0,
    };
  });

  const newlist = [...list, ...fixedcubedata, ...subbox];

  const data = bloodcoin.filter(
    (item) => !item.이름.includes("점령전 실링 상자")
  );
  let newarray = data.map((e) => {
    const Name = e.이름;
    const Quntaty = e.개수;
    const Coin = e["실마엘 혈석"];
    const matchingItem = newlist.find(
      (item) => item.Name === e.이름.replace(/\d/g, "")
    );
    let Price = 0;
    if (matchingItem) {
      Price = (e.개수 * matchingItem.YDayAvgPrice) / matchingItem.BundleCount;
    }
    const Rate = Price / Coin;
    return {
      Name: Name,
      Quntaty: Quntaty,
      Coin: Coin,
      Price: Price,
      Rate: Rate,
    };
  });

  const [sortOrder, setSortOrder] = useState<string>("desc");
  if (sortOrder === "asc") {
    newarray.sort((a, b) => a.Rate - b.Rate);
  } else if (sortOrder === "desc") {
    newarray.sort((a, b) => b.Rate - a.Rate);
  }
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  const levellist = [
    {
      label: "1250+",
      value: "1250",
    },
    {
      label: "1490+",
      value: "1490",
    },
    {
      label: "1540+",
      value: "1540",
    },
    {
      label: "1580+",
      value: "1580",
    },

    {
      label: "1620+",
      value: "1620",
    },
  ];
  const [selectedOption2, setSelectedOption2] = useState<any>(undefined);
  const [level, setlevel] = useState<string>("1620");
  useEffect(() => {
    if (selectedOption2) {
      const newData2 = selectedOption2.value;
      setlevel(newData2);
    }
  }, [selectedOption2]);
  const handleChange2 = (selected: any = {}) => {
    setSelectedOption2(selected);
  };
  const levelfilter: any = {
    1250: [
      "자경단의 입장권 상자3",
      "자경단의 입장권 상자2",
      "자경단의 입장권 상자1",
      "위대한 명예의 돌파석",
      "파괴석 결정3",
      "파괴석 결정2",
      "파괴석 결정1",
      "수호석 결정3",
      "수호석 결정2",
      "수호석 결정1",
      "태양의 보조재 상자3",
      "태양의 보조재 상자2",
      "태양의 보조재 상자1",
      "명예의 파편 주머니(소)1",
      "명예의 파편 주머니(소)2",
      "현자의 가루3",
      "명예의 파편 주머니(소)3",
      "현자의 가루2",
      "현자의 가루1",
    ],
    1490: [
      "기사단의 입장권 상자2",
      "기사단의 입장권 상자3",
      "기사단의 입장권 상자1",
      "파괴강석1",
      "파괴강석2",
      "수호강석1",
      "수호강석2",
      "경이로운 명예의 돌파석",
      "태양의 보조재 상자3",
      "태양의 보조재 상자2",
      "태양의 보조재 상자1",
      "명예의 파편 주머니(소)1",
      "명예의 파편 주머니(소)2",
      "현자의 가루3",
      "명예의 파편 주머니(소)3",
      "현자의 가루2",
      "현자의 가루1",
    ],
    1540: [
      "기사단의 입장권 상자2",
      "기사단의 입장권 상자3",
      "기사단의 입장권 상자1",
      "타이예르의 입장권 상자1",
      "타이예르의 입장권 상자2",
      "파괴강석1",
      "파괴강석2",
      "수호강석1",
      "수호강석2",
      "경이로운 명예의 돌파석",
      "태양의 보조재 상자3",
      "태양의 보조재 상자2",
      "태양의 보조재 상자1",
      "명예의 파편 주머니(소)1",
      "명예의 파편 주머니(소)2",
      "현자의 가루3",
      "명예의 파편 주머니(소)3",
      "현자의 가루2",
      "현자의 가루1",
    ],
    1580: [
      "라제니스의 입장권 상자2",
      "라제니스의 입장권 상자1",
      "찬란한 명예의 돌파석",
      "정제된 파괴강석",
      "정제된 수호강석",
      "태양의 보조재 상자3",
      "태양의 보조재 상자2",
      "태양의 보조재 상자1",
      "명예의 파편 주머니(소)1",
      "명예의 파편 주머니(소)2",
      "현자의 가루3",
      "명예의 파편 주머니(소)3",
      "현자의 가루2",
      "현자의 가루1",
    ],
    1620: [
      "현자의 입장권 상자2",
      "현자의 입장권 상자1",
      "라제니스의 입장권 상자2",
      "라제니스의 입장권 상자1",
      "찬란한 명예의 돌파석",
      "정제된 파괴강석",
      "정제된 수호강석",
      "태양의 보조재 상자3",
      "태양의 보조재 상자2",
      "태양의 보조재 상자1",
      "명예의 파편 주머니(소)1",
      "명예의 파편 주머니(소)2",
      "현자의 가루3",
      "명예의 파편 주머니(소)3",
      "현자의 가루2",
      "현자의 가루1",
    ],
  };

  return (
    <div>
      <Select
        options={Array.isArray(levellist) ? levellist : []}
        value={selectedOption2}
        onChange={handleChange2}
        isSearchable={true} // 검색 가능한 드롭다운으로 설정
        placeholder="구매 캐릭터 레벨 : 초기값 1620 설정"
      />
      <div style={{ maxHeight: "800px", overflowY: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th className="hidden md:table-cell">개수</th>
              <th className="hidden md:table-cell">골드가치</th>
              <th className="hidden md:table-cell">주화개수</th>
              <th>
                골드/주화
                <span
                  onClick={() => toggleSortOrder()}
                  style={{ cursor: "pointer" }}
                >
                  {sortOrder === "asc" ? "▲" : "▼"}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {newarray.map((item, index) => {
              if (levelfilter[level].includes(item.Name)) {
                return (
                  <tr key={index}>
                    <td>{item.Name}</td>
                    <td className="hidden md:table-cell">{item.Quntaty}</td>
                    <td className="hidden md:table-cell">
                      {item.Price.toFixed(0)}
                    </td>
                    <td className="hidden md:table-cell">{item.Coin}</td>
                    <td>{item.Rate.toFixed(4)}</td>
                  </tr>
                );
              } else {
                return null;
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
