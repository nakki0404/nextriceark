"use client";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/store/store";
import Select from "react-select";
import { addcontentlists } from "@/store/slices/ContentLists";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import type { Item } from "@/types/ContentLists";
export default function Maker() {
  const dispatch = useDispatch<AppDispatch>();
  const list = useAppSelector((state) => state.marketallitemsreducer);
  const newlist = list;
  // console.log(newlist);
  const [localStorageKey] = useState("tableDataKey"); // 로컬 저장소 키
  useEffect(() => {
    const savedData: any = localStorage.getItem(localStorageKey);
    if (savedData) {
      setSelectedItems(JSON.parse(savedData));
    }
  }, [localStorageKey]);
  type selectedItems = {
    _id: string;
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
    __v: number;
  };
  const [title, setTitle] = useState("");
  const [selectedItems, setSelectedItems] = useState<selectedItems[]>([]);
  const handleQuantityChange = (index: number, quantity: number) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedItems = [...selectedItems];
      updatedItems[index].Quantity = Math.max(0, quantity);
      localStorage.setItem(localStorageKey, JSON.stringify(updatedItems));
      return updatedItems;
    });
  };
  const handleQuantityChange2 = (index: number, quantity: number) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedItems = [...selectedItems];
      updatedItems[index].Quantity2 = Math.max(0, quantity); // 최소값 0으로 설정
      localStorage.setItem(localStorageKey, JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const handleDelete = (index: number) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedItems = selectedItems.filter((item, i) => i !== index);
      localStorage.setItem(localStorageKey, JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const totalprice: number = selectedItems.reduce(
    (total, item) =>
      total + (item.YDayAvgPrice * item.Quantity) / item.BundleCount,
    0
  );
  const totalprice2: number = selectedItems.reduce(
    (total, item) =>
      total + (item.YDayAvgPrice * item.Quantity2) / item.BundleCount,
    0
  );

  const totalprice3: number = totalprice2 + totalprice;
  const handleClearTable = () => {
    setSelectedItems([]);
    setTitle("");
    localStorage.removeItem(localStorageKey);
  };

  type selectedOption =
    | {
        label: string;
        value: string;
      }
    | undefined;

  const [selectedOption, setSelectedOption] =
    useState<selectedOption>(undefined);

  useEffect(() => {
    if (selectedOption) {
      const newData = selectedOption.value;
      handleDropdownSelect(newData);
    }
  }, [selectedOption]);

  const selectlist: { label: string; value: string }[] = [];

  newlist.map((i) =>
    i.ItemList.map((e) => selectlist.push({ label: e.Name, value: e.Name }))
  );
  // console.log(selectlist);

  const handleChange = (selected: any = {}) => {
    setSelectedOption(selected);
  };
  //   Array.isArray(newlist) &&
  //   newlist.map((e) => ({ label: e.Name, value: e.Name }));
  // const handleChange = (selected: any = {}) => {
  //   setSelectedOption(selected);
  // };
  const handleDropdownSelect = (data: any) => {
    if (selectedItems.some((item) => item.Name === data)) {
      console.log("중복");
    } else {
      setSelectedItems((prevSelectedItems: any) => {
        const updatedItems = [
          ...prevSelectedItems,
          {
            //기존 itemslist에서 셀렉트한것 이름 일치한거 찾아서 그 객체만 추가.
            // ...newlist.find((e: any) => e.Name === data),
            ...newlist
              .find((e) => e.ItemList.find((i) => i.Name === data))
              ?.ItemList.find((i) => i.Name === data),
            Quantity: 0,
            Quantity2: 0,
          },
        ];
        // console.log(updatedItems);
        localStorage.setItem(localStorageKey, JSON.stringify(updatedItems));
        return updatedItems;
      });
    }
  };

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  };
  const [pass, setPass] = useState("");
  const touch = () => {
    fetch(process.env.REACT_APP_BACKEND_URL + "/touch")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPass(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    touch();
  }, []);
  const [form, setForm] = useState("");
  const fillForm = (value: any) => {
    setForm(value);
  };
  const handleValueListMake = (
    title: string,
    selectedItems: Item[],
    form: string
  ) => {
    if (title !== "" && selectedItems.length !== 0) {
      dispatch(
        addcontentlists({
          Title: title,
          List: selectedItems,
        })
      );
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Item: {
            Title: title,
            List: selectedItems,
          },
          Pass: form,
        }),
      };
      fetch(process.env.REACT_APP_BACKEND_URL + "/update1", requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Data updated successfully:", data);
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
      setSelectedItems([]);
      setTitle("");
      localStorage.removeItem(localStorageKey);
      setForm("");
      touch();
    }
  };
  function additems() {
    setSelectedItems((prevSelectedItems: any) => {
      const updatedItems = [
        ...prevSelectedItems,
        {
          ...newlist
            .find((e) => e.ItemList.find((i) => i.Name === "수호석 결정"))
            ?.ItemList.find((i) => i.Name === "수호석 결정"),
          Quantity: 0,
          Quantity2: 0,
        },
        {
          ...newlist
            .find((e) => e.ItemList.find((i) => i.Name === "파괴석 결정"))
            ?.ItemList.find((i) => i.Name === "파괴석 결정"),
          Quantity: 0,
          Quantity2: 0,
        },
        {
          ...newlist
            .find((e) =>
              e.ItemList.find((i) => i.Name === "위대한 명예의 돌파석")
            )
            ?.ItemList.find((i) => i.Name === "위대한 명예의 돌파석"),
          Quantity: 0,
          Quantity2: 0,
        },
        {
          ...newlist
            .find((e) => e.ItemList.find((i) => i.Name === "오레하 융화 재료"))
            ?.ItemList.find((i) => i.Name === "오레하 융화 재료"),
          Quantity: 0,
          Quantity2: 0,
        },
        {
          ...newlist
            .find((e) => e.ItemList.find((i) => i.Name === "명예의 파편(낱개)"))
            ?.ItemList.find((i) => i.Name === "명예의 파편(낱개)"),
          Quantity: 0,
          Quantity2: 0,
        },
      ];
      return updatedItems;
    });
  }

  function additems2() {
    setSelectedItems((prevSelectedItems: any) => {
      const updatedItems = [
        ...prevSelectedItems,
        {
          ...newlist
            .find((e) => e.ItemList.find((i) => i.Name === "수호강석"))
            ?.ItemList.find((i) => i.Name === "수호강석"),
          Quantity: 0,
          Quantity2: 0,
        },
        {
          ...newlist
            .find((e) => e.ItemList.find((i) => i.Name === "파괴강석"))
            ?.ItemList.find((i) => i.Name === "파괴강석"),
          Quantity: 0,
          Quantity2: 0,
        },
        {
          ...newlist
            .find((e) =>
              e.ItemList.find((i) => i.Name === "경이로운 명예의 돌파석")
            )
            ?.ItemList.find((i) => i.Name === "경이로운 명예의 돌파석"),
          Quantity: 0,
          Quantity2: 0,
        },
        {
          ...newlist
            .find((e) =>
              e.ItemList.find((i) => i.Name === "상급 오레하 융화 재료")
            )
            ?.ItemList.find((i) => i.Name === "상급 오레하 융화 재료"),
          Quantity: 0,
          Quantity2: 0,
        },
        {
          ...newlist
            .find((e) => e.ItemList.find((i) => i.Name === "명예의 파편(낱개)"))
            ?.ItemList.find((i) => i.Name === "명예의 파편(낱개)"),
          Quantity: 0,
          Quantity2: 0,
        },
      ];
      return updatedItems;
    });
  }

  function additems3() {
    setSelectedItems((prevSelectedItems: any) => {
      const updatedItems = [
        ...prevSelectedItems,
        {
          ...newlist
            .find((e) => e.ItemList.find((i) => i.Name === "정제된 수호강석"))
            ?.ItemList.find((i) => i.Name === "정제된 수호강석"),
          Quantity: 0,
          Quantity2: 0,
        },
        {
          ...newlist
            .find((e) => e.ItemList.find((i) => i.Name === "정제된 파괴강석"))
            ?.ItemList.find((i) => i.Name === "정제된 파괴강석"),
          Quantity: 0,
          Quantity2: 0,
        },
        {
          ...newlist
            .find((e) =>
              e.ItemList.find((i) => i.Name === "찬란한 명예의 돌파석")
            )
            ?.ItemList.find((i) => i.Name === "찬란한 명예의 돌파석"),
          Quantity: 0,
          Quantity2: 0,
        },
        {
          ...newlist
            .find((e) =>
              e.ItemList.find((i) => i.Name === "최상급 오레하 융화 재료")
            )
            ?.ItemList.find((i) => i.Name === "최상급 오레하 융화 재료"),
          Quantity: 0,
          Quantity2: 0,
        },
        {
          ...newlist
            .find((e) => e.ItemList.find((i) => i.Name === "명예의 파편(낱개)"))
            ?.ItemList.find((i) => i.Name === "명예의 파편(낱개)"),
          Quantity: 0,
          Quantity2: 0,
        },
      ];
      return updatedItems;
    });
  }
  return (
    <main>
      <div className="text-xl m-1">재화계산기</div>
      <div className="flex flex-row">
        <div className="text-xl m-1">묶음추가</div>
        <button
          className="h-8 w-16 bg-green-500 rounded-lg text-white m-2"
          onClick={() => additems()}
        >
          1250~
        </button>
        <button
          className="h-8 w-16 bg-green-500 rounded-lg text-white m-2"
          onClick={() => additems2()}
        >
          1490~
        </button>
        <button
          className="h-8 w-16 bg-green-500 rounded-lg text-white m-2"
          onClick={() => additems3()}
        >
          1580~
        </button>
      </div>
      <div className="w-5/6 m-1">
        <Select
          options={Array.isArray(selectlist) ? selectlist : []}
          value={selectedOption}
          onChange={handleChange}
          isSearchable={true} // 검색 가능한 드롭다운으로 설정
          placeholder="재화를 선택하세요"
        />
      </div>
      <table className="table-fixed">
        <thead>
          <tr>
            <th className=" w-32">그림</th>
            <th className="w-48  ">개수(교환가능,기본)</th>
            <th className="w-48  ">개수(귀속, 더보기)</th>
            <th className=" w-32 "></th>
          </tr>
        </thead>

        <tbody>
          {selectedItems.map((item, index) => (
            <tr key={index}>
              <td className="h-16 w-16 m-2  ">
                <img
                  src={item.Icon} // 이미지 파일의 URL을 여기에 입력
                  title={item.Name}
                />
              </td>
              <td>
                <input
                  className="w-32 m-1 rounded-lg text-right"
                  type="number"
                  value={item.Quantity}
                  onChange={(e) =>
                    handleQuantityChange(index, parseInt(e.target.value, 10))
                  }
                ></input>
              </td>
              <td>
                <input
                  className="w-32 m-1 rounded-lg text-right"
                  type="number"
                  value={item.Quantity2}
                  onChange={(e) =>
                    handleQuantityChange2(index, parseInt(e.target.value, 10))
                  }
                ></input>
              </td>
              <td>
                <button
                  className="h-8 w-16 bg-red-500 rounded-lg text-white m-2"
                  onClick={() => handleDelete(index)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td style={{ textAlign: "right" }}>{`부분합계 ${totalprice.toFixed(
              0
            )} G`}</td>
            <td style={{ textAlign: "right" }}>{`부분합계 ${totalprice2.toFixed(
              0
            )} G`}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>

            <td style={{ textAlign: "right" }}>{`전체 합 ${totalprice3.toFixed(
              0
            )} G`}</td>
          </tr>
        </tbody>
      </table>
      <div className="flex flex-row items-center justify-center">
        <div>
          <input
            className="w-5/6 m-1 rounded-lg text-right"
            type="text"
            placeholder="컨텐츠, 상자 이름"
            onChange={handleTitleChange}
            value={title}
          />
          <input
            className="w-5/6 m-1 rounded-lg text-right"
            type="text"
            placeholder={`${pass}` + " 자동입력방지 문자"}
            onChange={(e) => fillForm(e.target.value)}
            value={form}
          />
        </div>
        <div>
          <button
            className="h-8 w-16 bg-blue-500 rounded-lg text-white m-2"
            onClick={() => handleValueListMake(title, selectedItems, form)}
          >
            저장
          </button>
        </div>
        <div>
          <button
            className="h-8 w-16 bg-red-500 rounded-lg text-white m-2"
            onClick={handleClearTable}
          >
            비우기
          </button>
        </div>
      </div>
      <div>
        설명
        <br /> 1.재화를 검색하고 선택하면 추가됩니다.
        <br /> 2.개수를 정하면 전일 평균가로 계산합니다.
        <br /> 3.이름을 적고 저장하면 타인도 볼수있습니다.
      </div>
    </main>
  );
}
