"use client";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/store/store";
import Select from "react-select";
import { addcontentlists } from "@/store/slices/contentlists";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import type { Item } from "@/types/ContentLists";
import { v4 as uuidv4 } from "uuid";
import { useCaptchaCodeQuery } from "@/hooks/api/useCaptchaCodeQuery";
import { useCaptchaCodeMutation } from "@/hooks/api/useCaptchaCodeMutation";
import PopupBooleanModal from "@/components/common/PopupBooleanModal";
import PopupModal from "@/components/common/PopupModal";
export default function Maker() {
  const mutation = useCaptchaCodeMutation();
  const dispatch = useDispatch<AppDispatch>();
  const newlist = useAppSelector((state) => state.marketItemsreducer);
  let loginstate = useAppSelector((state: any) => state.loginstatereducer); // 이 부분은 해당 상태의 유형을 명시적으로 지정해야합니다.

  const [localStorageKey] = useState("tableDataKey"); // 로컬 저장소 키
  useEffect(() => {
    const savedData: any = localStorage.getItem(localStorageKey);
    if (savedData) {
      setSelectedItems(JSON.parse(savedData));
    }
  }, [localStorageKey]);
  type selectedItems = {
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

  const [isModalOpen2, setModalOpen2] = useState(false);
  const handleOpenModal2 = () => {
    setModalOpen2(true);
  };
  const handleModalClose2 = async (confirmed: boolean) => {
    setModalOpen2(false);
    const result = await new Promise((resolve) => {
      const data = confirmed;
      resolve(data);
    });
    if (result == true) {
      handleClearTable();
    } else {
    }
  };

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

  // let selectlist: { label: string; value: string }[] = [];

  // newlist.map((i) =>
  //   i.ItemList.map((e) => selectlist.push({ label: e.Name, value: e.Name }))
  // );
  // console.log(selectlist);

  // const handleChange = (selected: any = {}) => {
  //   setSelectedOption(selected);
  // };
  let selectlist =
    Array.isArray(newlist) &&
    newlist.map((e) => ({ label: e.Name, value: e.Name }));
  const handleChange = (selected: any = {}) => {
    setSelectedOption(selected);
  };
  const handleChange2 = (selected: any = {}) => {
    setSelectedOption2(selected);
  };
  const handleDropdownSelect = (data: any) => {
    if (selectedItems.some((item) => item.Name === data)) {
      console.log("중복");
    } else {
      setSelectedItems((prevSelectedItems: any) => {
        const updatedItems = [
          ...prevSelectedItems,
          {
            //기존 itemslist에서 셀렉트한것 이름 일치한거 찾아서 그 객체만 추가.
            ...newlist.find((e: any) => e.Name === data),
            // ...newlist
            //   .find((e) => e.ItemList.find((i) => i.Name === data))
            //   ?.ItemList.find((i) => i.Name === data),
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
  const { captchaCode } = useCaptchaCodeQuery();

  const [form, setForm] = useState("");
  const fillForm = (value: string) => {
    setForm(value);
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleModalClose = async (confirmed: boolean) => {
    setModalOpen(false);
    const result = await new Promise((resolve) => {
      const data = confirmed;
      resolve(data);
    });
    if (result == true) {
      handleValueListMake(title, selectedItems, category, form);
    } else {
    }
  };

  const handleValueListMake = (
    title: string,
    selectedItems: Item[],
    category: string,
    form: string,
    _id?: any,
    ID?: any
  ) => {
    if (
      String(captchaCode) === form &&
      title !== "" &&
      selectedItems.length !== 0
    ) {
      let uuid = uuidv4();

      dispatch(
        addcontentlists({
          _id: uuid,
          Title: title,
          List: selectedItems,
          Category: category,
          ID: loginstate.ID,
        })
      );
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Item: {
            _id: uuid,
            Title: title,
            List: selectedItems,
            Category: category,
            ID: loginstate.ID,
          },
          captchaCode: form,
        }),
      };
      fetch(
        process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL + "/list",
        requestOptions
      )
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
      setCategory("");
    } else {
      setForm("");
      mutation.mutate(captchaCode);
    }
    //코드와 폼의 값을 비교해서 다르면 코드를 재발급 받습니다.
  };
  function additems() {
    setSelectedItems((prevSelectedItems: any) => {
      const updatedItems = [
        ...prevSelectedItems,
        {
          ...newlist.find((e: any) => e.Name === "수호석 결정"),
          Quantity: 0,
          Quantity2: 0,
        },
        {
          ...newlist.find((e: any) => e.Name === "파괴석 결정"),
          Quantity: 0,
          Quantity2: 0,
        },
        {
          ...newlist.find((e: any) => e.Name === "위대한 명예의 돌파석"),
          Quantity: 0,
          Quantity2: 0,
        },
        {
          ...newlist.find((e: any) => e.Name === "오레하 융화 재료"),
          Quantity: 0,
          Quantity2: 0,
        },
        {
          ...newlist.find((e: any) => e.Name === "명예의 파편(낱개)"),
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
          ...newlist.find((e: any) => e.Name === "수호강석"),
          Quantity: 0,
          Quantity2: 0,
        },
        {
          ...newlist.find((e: any) => e.Name === "파괴강석"),
          Quantity: 0,
          Quantity2: 0,
        },
        {
          ...newlist.find((e: any) => e.Name === "경이로운 명예의 돌파석"),
          Quantity: 0,
          Quantity2: 0,
        },
        {
          ...newlist.find((e: any) => e.Name === "상급 오레하 융화 재료"),
          Quantity: 0,
          Quantity2: 0,
        },
        {
          ...newlist.find((e: any) => e.Name === "명예의 파편(낱개)"),
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
          ...newlist.find((e: any) => e.Name === "정제된 수호강석"),
          Quantity: 0,
          Quantity2: 0,
        },
        {
          ...newlist.find((e: any) => e.Name === "정제된 파괴강석"),
          Quantity: 0,
          Quantity2: 0,
        },
        {
          ...newlist.find((e: any) => e.Name === "찬란한 명예의 돌파석"),
          Quantity: 0,
          Quantity2: 0,
        },
        {
          ...newlist.find((e: any) => e.Name === "최상급 오레하 융화 재료"),
          Quantity: 0,
          Quantity2: 0,
        },
        {
          ...newlist.find((e: any) => e.Name === "명예의 파편(낱개)"),
          Quantity: 0,
          Quantity2: 0,
        },
      ];
      return updatedItems;
    });
  }
  function additems4() {
    setSelectedItems((prevSelectedItems: any) => {
      const updatedItems = [
        ...prevSelectedItems,
        {
          ...newlist.find((e: any) => e.Name === "골드"),
          Quantity: 0,
          Quantity2: 0,
        },
      ];
      return updatedItems;
    });
  }
  function additems5() {
    setSelectedItems((prevSelectedItems: any) => {
      const updatedItems = [
        ...prevSelectedItems,
        {
          ...newlist.find((e: any) => e.Name === "더보기 골드"),
          Quantity: 0,
          Quantity2: 0,
        },
      ];
      return updatedItems;
    });
  }

  const [category, setCategory] = useState("");
  const categorylist = [
    {
      label: "레이드",
      value: "레이드",
    },
    {
      label: "상자",
      value: "상자",
    },
    {
      label: "가토",
      value: "가토",
    },
    {
      label: "카던",
      value: "카던",
    },
  ];
  const [selectedOption2, setSelectedOption2] =
    useState<selectedOption>(undefined);

  useEffect(() => {
    if (selectedOption2) {
      const newData2 = selectedOption2.value;
      setCategory(newData2);
    }
  }, [selectedOption2]);

  const handleInput = (e: any, index: number) => {
    const inputValue = e.target.value;

    // 정수형 숫자인지 확인
    if (/^\d+$/.test(inputValue)) {
      handleQuantityChange(index, parseInt(inputValue, 10));
    } else {
      openModal3();
      setSelectedItems((prevSelectedItems) => {
        const updatedItems = [...selectedItems];
        updatedItems[index].Quantity = updatedItems[index].Quantity; // 최소값 0으로 설정
        return updatedItems;
      });
    }
  };
  const handleInput2 = (e: any, index: number) => {
    const inputValue = e.target.value;

    // 정수형 숫자인지 확인
    if (/^\d+$/.test(inputValue)) {
      handleQuantityChange2(index, parseInt(inputValue, 10));
    } else {
      openModal4();
      setSelectedItems((prevSelectedItems) => {
        const updatedItems = [...selectedItems];
        updatedItems[index].Quantity2 = updatedItems[index].Quantity2; // 최소값 0으로 설정
        return updatedItems;
      });

      // 유효하지 않은 입력값이면 아무것도 하지 않거나 오류 처리를 추가할 수 있습니다.
      // 여기서는 아무런 작업도 수행하지 않음
    }
  };

  const [isModalOpen3, setModalOpen3] = useState(false);

  const openModal3 = () => {
    setModalOpen3(true);
  };

  const closeModal3 = () => {
    setModalOpen3(false);
  };
  const [isModalOpen4, setModalOpen4] = useState(false);

  const openModal4 = () => {
    setModalOpen4(true);
  };

  const closeModal4 = () => {
    setModalOpen4(false);
  };

  return (
    <div>
      <div className="flex flex row  m-1">
        <Select
          options={Array.isArray(categorylist) ? categorylist : []}
          value={selectedOption2}
          onChange={handleChange2}
          isSearchable={true} // 검색 가능한 드롭다운으로 설정
          placeholder="분류"
        />
        <Select
          options={Array.isArray(selectlist) ? selectlist : []}
          value={selectedOption}
          onChange={handleChange}
          isSearchable={true} // 검색 가능한 드롭다운으로 설정
          placeholder="재화를 선택하세요"
        />
      </div>
      <div className="flex flex-row">
        <button
          className="h-6 w-12 bg-green-500 rounded-lg text-white m-1"
          onClick={() => additems()}
        >
          1250
        </button>
        <button
          className="h-6 w-12 bg-green-500 rounded-lg text-white m-1"
          onClick={() => additems2()}
        >
          1490
        </button>
        <button
          className="h-6 w-12 bg-green-500 rounded-lg text-white m-1"
          onClick={() => additems3()}
        >
          1580
        </button>
        <button
          className="h-6 w-12 bg-yellow-500 rounded-lg text-white m-1"
          onClick={() => additems4()}
        >
          골드
        </button>
        <button
          className="h-6 w-16 bg-red-500 rounded-lg text-white m-1"
          onClick={() => additems5()}
        >
          더보기
        </button>
      </div>
      <table className="table-fixed">
        <thead>
          <tr>
            <th className=" w-32">그림</th>
            <th className="w-48 ">
              {category === "레이드" ? "기본보상" : "교환가능"}
            </th>
            <th className="w-48  ">
              {category === "레이드" ? "더보기" : "교환불가"}
            </th>
            <th className=" w-32 "></th>
          </tr>
        </thead>

        <tbody>
          {selectedItems.map((item, index) => (
            <tr key={index}>
              <td className="grid place-content-center">
                <img
                  src={item.Icon} // 이미지 파일의 URL을 여기에 입력
                  title={item.Name}
                />
              </td>
              <td className="">
                <input
                  className="w-5/6 m-1 rounded-lg text-right   "
                  type="number"
                  value={item.Quantity}
                  onInput={(e) => handleInput(e, index)}
                ></input>
                <PopupModal
                  isOpen={isModalOpen3}
                  closeModal={closeModal3}
                  message="숫자만 입력해주세요."
                />
              </td>

              <td className="">
                <input
                  className="w-5/6 m-1 rounded-lg text-right "
                  type="number"
                  value={item.Quantity2}
                  onInput={(e) => handleInput2(e, index)}
                ></input>
                <PopupModal
                  isOpen={isModalOpen4}
                  closeModal={closeModal4}
                  message="숫자만 입력해주세요."
                />
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
            <td style={{ textAlign: "right" }}>{`부분합 ${totalprice.toFixed(
              0
            )} G`}</td>
            <td style={{ textAlign: "right" }}>{`부분합 ${totalprice2.toFixed(
              0
            )} G`}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>

            <td style={{ textAlign: "right" }}>{`총합 ${totalprice3.toFixed(
              0
            )} G`}</td>
          </tr>
        </tbody>
      </table>
      <div className="flex flex-row items-center justify-center">
        <div className="flex flex-col">
          <input
            className="w-5/6 m-1 rounded-lg text-right "
            type="text"
            placeholder="컨텐츠 이름"
            onChange={handleTitleChange}
            value={title}
          />
          <input
            className="w-5/6 m-1 rounded-lg text-right "
            type="string"
            placeholder={`${captchaCode}` + " 자동입력방지 문자"}
            onChange={(e) => fillForm(e.target.value)}
            value={form}
          />
        </div>
        <div>
          <button
            className="h-8 w-16 bg-blue-500 rounded-lg text-white m-1"
            onClick={handleOpenModal}
          >
            저장
          </button>
          <PopupBooleanModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            message="저장을 하고 목록을 비웁니다."
          />
        </div>
        <div>
          <button
            className="h-8 w-16 bg-red-500 rounded-lg text-white m-1"
            onClick={handleOpenModal2}
          >
            비우기
          </button>
          <PopupBooleanModal
            isOpen={isModalOpen2}
            onClose={handleModalClose2}
            message="비우기를 클릭하셨습니다. 정말 비울까요?"
          />
        </div>
      </div>
      <div>
        설명
        <br /> 1.재화를 검색하고 선택하면 추가됩니다.
        <br /> 2.개수를 정하면 전일 평균가로 계산합니다.
        <br /> 3.이름을 적고 저장하면 타인도 볼수있습니다.
      </div>
    </div>
  );
}
