"use client";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/store/store";
import Select from "react-select";

import { addcontentvalues } from "@/store/slices/contentvalues";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
export default function Calculator3() {
  const dispatch = useDispatch<AppDispatch>();
  const list = useAppSelector((state) => state.itemreducer);
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

  const handleQuantityChange2 = (index, quantity2) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedItems = [...selectedItems];
      updatedItems[index].Quantity2 = Math.max(0, parseInt(quantity2, 10)); // 최소값 0으로 설정
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

  const handleValueListMake = (title, selectedItems) => {
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
      // const requestOptions = {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     Item: { Title: title, List: selectedItems },
      //     Pass: value,
      //   }),
      // };

      // fetch(process.env.REACT_APP_BACKEND_URL + "/update1", requestOptions)
      //   .then((response) => {
      //     if (!response.ok) {
      //       throw new Error("Network response was not ok");
      //     }
      //     return response.json();
      //   })
      //   .then((data) => {
      //     console.log("Data updated successfully:", data);
      //   })
      //   .catch((error) => {
      //     console.error("Error updating data:", error);
      //   });
      setSelectedItems([]);
      setTitle("");
      localStorage.removeItem(localStorageKey);
      setForm("");
      touch();
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center ">
      <div>재화계산기</div>
      <Select
        options={Array.isArray(selectlist) ? selectlist : []}
        value={selectedOption}
        onChange={handleChange}
        isSearchable={true} // 검색 가능한 드롭다운으로 설정
        placeholder="재화를 선택하세요"
      />
      <div>
        {/* <fieldset>
          <input id="draft" class="peer/draft" type="radio" name="status" />
          <label for="draft" class="peer-checked/draft:text-sky-500">
            일반
          </label>

          <input
            id="published"
            class="peer/published"
            type="radio"
            name="status"
          />
          <label for="published" class="peer-checked/published:text-sky-500">
            컨텐츠
          </label>

          <div class="hidden peer-checked/draft:block">
            일반은 귀속 여부를 구분합니다.
          </div>
          <div class="hidden peer-checked/published:block">
            컨텐츠는 더보기 유무를 구분합니다.
          </div>
        </fieldset> */}
        <button>1250</button>
        <button>1490</button>
        <button>1580</button>
      </div>

      <table className="table-auto">
        <thead>
          <tr id="draft-row">
            <th>교환가능</th>
            <th></th>
            <th>캐릭터귀속</th>
            <th></th>
            <th></th>
          </tr>
          <tr id="published-row">
            <th>일반</th>
            <th></th>
            <th>더보기</th>
            <th></th>
            <th></th>
          </tr>
          <tr id="common-row">
            <th>그림</th>
            <th>개수</th>
            <th>그림</th>
            <th>개수</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {selectedItems.map((item, index) => (
            <tr key={index}>
              <td>
                <img
                  src={item.Icon} // 이미지 파일의 URL을 여기에 입력
                  title={item.Name}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.Quantity}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                ></input>
              </td>
              <td>
                <img
                  src={item.Icon} // 이미지 파일의 URL을 여기에 입력
                  title={item.Name}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.Quantity2}
                  onChange={(e) => handleQuantityChange2(index, e.target.value)}
                ></input>
              </td>
              <td>
                <button onClick={() => handleDelete(index)}>삭제</button>
              </td>
            </tr>
          ))}
          <tr>
            <td>합계</td>
            <td style={{ textAlign: "right" }}>{`합계 ${totalprice.toFixed(
              0
            )} G`}</td>
            <td>합계</td>
            <td style={{ textAlign: "right" }}>{`합계 ${totalprice2.toFixed(
              0
            )} G`}</td>
          </tr>
          <tr>
            <td>합계</td>
            <td>{`합계 ${totalprice3.toFixed(0)} G`}</td>
          </tr>
        </tbody>
      </table>

      <div>
        <input
          type="text"
          placeholder="컨텐츠이름 ex)#발탄#더보기, #카던#귀속포함"
          onChange={handleTitleChange}
          value={title}
        />
        <input
          type="number"
          placeholder={`${pass}` + "를 입력해주세요 자동입력방지"}
          onChange={(e) => fillForm(e.target.value)}
          value={form}
        />
        <div>
          <button
            className="w-100"
            onClick={() =>
              handleValueListMake(
                title,
                selectedItems,
                totalprice,
                totalprice2,
                totalprice3
              )
            }
          >
            저장
          </button>
        </div>
        <div>
          <button className="w-100" onClick={handleClearTable}>
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
