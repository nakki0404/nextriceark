"use client";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/store/store";
import Select from "react-select";

import { addcontentvalues } from "@/store/slices/contentvalues";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
export default function CalculatorForm() {
  const dispatch = useDispatch<AppDispatch>();
  const list = useAppSelector((state) => state.marketitemsreducer);
  const newlist = list ? list[0] : [];
  // const [radio, setRadio] = useState(true);
  const [localStorageKey] = useState("tableDataKey"); // 로컬 저장소 키
  // const [localStorageKey2] = useState("tableDataKey2"); // 로컬 저장소 키

  useEffect(() => {
    // 로컬 저장소에서 데이터 불러오기
    const savedData = localStorage.getItem(localStorageKey);
    if (savedData) {
      setSelectedItems(JSON.parse(savedData));
    }
  }, [localStorageKey]);

  // useEffect(() => {
  //   // 로컬 저장소에서 데이터 불러오기
  //   const savedData = localStorage.getItem(localStorageKey2);
  //   if (savedData) {
  //     setRadio(JSON.parse(savedData));
  //   }
  // }, [localStorageKey2]);

  // function savestate(){
  //   if(radio=false){
  //   setRadio(true)}
  //   else{
  //     setRadio(false)}
  // }

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

  const [selectedItems, setSelectedItems] = useState([]);

  const handleQuantityChange = (index: number, quantity: number) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedItems = [...selectedItems];

      updatedItems[index].Quantity = Math.max(0, parseInt(quantity, 10)); // 최소값 0으로 설정
      localStorage.setItem(localStorageKey, JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const handleQuantityChange2 = (index: number, quantity: number) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedItems = [...selectedItems];
      updatedItems[index].Quantity2 = Math.max(0, parseInt(quantity, 10)); // 최소값 0으로 설정
      localStorage.setItem(localStorageKey, JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const handleDelete = (index) => {
    // const updatedItems = selectedItems.filter((item, i) => i !== index);
    // setSelectedItems(updatedItems);

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

  // const totalprice2: number = selectedItems.reduce(
  //   (total, item) =>
  //     total + (item.Name === "골드" ? -(item.YDayAvgPrice * item.Quantity2) / item.BundleCount : (item.YDayAvgPrice * item.Quantity2) / item.BundleCount),
  //   0
  // );

  const totalprice3: number = totalprice2 + totalprice;

  const handleClearTable = () => {
    setSelectedItems([]);
    setTitle("");
    localStorage.removeItem(localStorageKey);
  };

  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const selectlist =
    Array.isArray(newlist) &&
    newlist.map((e) => ({ label: e.Name, value: e.Name }));
  const handleChange = (selected) => {
    setSelectedOption(selected);
  };
  useEffect(() => {
    if (selectedOption) {
      // 선택한 항목의 value 값을 data로 설정
      const newData = selectedOption.value;
      setData(newData);

      // handleDropdownSelect 호출 이후에 다음 단계를 진행
      handleDropdownSelect(newData, () => {
        // 다음 단계를 이곳에서 진행
        setData(""); // 또는 필요한 다른 작업 수행
      });
    }
  }, [selectedOption]);

  const handleDropdownSelect = (data) => {
    if (selectedItems.some((item) => item.Name === data)) {
      console.log("중복");
    }
    //중복처리 완료
    else {
      setSelectedItems((prevSelectedItems) => {
        const updatedItems = [
          ...prevSelectedItems,
          {
            ...newlist.find((e) => e.Name === data),
            Quantity: 0,
            Quantity2: 0,
          },
        ];
        localStorage.setItem(localStorageKey, JSON.stringify(updatedItems));
        return updatedItems;
      });
    }
  };
  // const draftRadio = document.getElementById("draft");
  // const publishedRadio = document.getElementById("published");
  // const draftRow = document.getElementById("draft-row");
  // const publishedRow = document.getElementById("published-row");
  // const commonRow = document.getElementById("common-row");

  // draftRadio.addEventListener("change", () => {
  //   if (draftRadio.checked) {
  //     draftRow.classList.remove("hidden");
  //     publishedRow.classList.add("hidden");
  //   }
  // });

  // publishedRadio.addEventListener("change", () => {
  //   if (publishedRadio.checked) {
  //     draftRow.classList.add("hidden");
  //     publishedRow.classList.remove("hidden");
  //   }
  // });

  const handleTitleChange = (e) => {
    setTitle(e.target.value); // 입력된 값을 title 상태에 저장
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

  const fillForm = (value) => {
    setForm(value);
  };

  const handleValueListMake = (
    title,
    selectedItems,
    totalprice,
    totalprice2,
    totalprice3,
    form
  ) => {
    //중복 이름 방지 로직 필요
    if (title !== "" && selectedItems.length !== 0) {
      dispatch(
        addcontentvalues({
          Title: title,
          List: selectedItems,
          totalprice,
          totalprice2,
          totalprice3,
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
            totalprice,
            totalprice2,
            totalprice3,
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
  return (
    <main>
      <div className="text-xl m-1">재화계산기</div>
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
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                ></input>
              </td>
              <td>
                <input
                  className="w-32 m-1 rounded-lg text-right"
                  type="number"
                  value={item.Quantity2}
                  onChange={(e) => handleQuantityChange2(index, e.target.value)}
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
            onClick={() =>
              handleValueListMake(
                title,
                selectedItems,
                totalprice,
                totalprice2,
                totalprice3,
                form
              )
            }
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
        <br /> 1.재화들을 고르세요.
        <br /> 2.개수를 정하고
        <br /> 3.컨텐츠 이름을 적어서
        <br /> 4.저장버튼을 누르세요
        <br /> 이제 다른 이용자도 볼 수 있습니다!
        <br /> 공백, 완전히 같은 이름은 등록안됩니다!
      </div>
    </main>
  );
}
