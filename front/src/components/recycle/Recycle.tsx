"use client";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/store/store";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import skilllist2 from "@/asset/data/skilllistorigin.json";
import jobskilllist2 from "@/asset/data/jobskilllist.json";
import PopupModal from "@/components/common/PopupModal";

export default function Recycle() {
  useEffect(() => {
    const savedata: any = localStorage.getItem("itemlist");
    setItemlist(JSON.parse(savedata));
  }, ["itemlist"]);
  useEffect(() => {
    const savedata: any = localStorage.getItem("hasskilllist");
    setHasskilllist(JSON.parse(savedata));
  }, ["hasskilllist"]);
  useEffect(() => {
    const savedata: any = localStorage.getItem("abilltylist");
    setAbilltylist(JSON.parse(savedata));
  }, ["abilltylist"]);
  let loginstate = useAppSelector((state: any) => state.loginstatereducer);
  let skilllist = skilllist2.map((e) => {
    return {
      label: e,
      value: e,
    };
  });
  let jobskilllist = jobskilllist2.map((e) => {
    return {
      label: e,
      value: e,
    };
  });
  let newskilllist = [...skilllist, ...jobskilllist];
  //데이터 풀
  // 서폿 딜러 *2
  // 유물 고대 *2
  // 목 귀 반 *3
  // itemlist // hasskilllist // abilltylist
  //모든 경우의 수 출력 함수

  const [location, setLocation] = useState("");

  const handleQuantityChange = (e: string) => {
    setLocation(e);
  };

  const gradelist = [
    {
      label: "유물",
      value: "유물",
    },
    {
      label: "고대",
      value: "고대",
    },
  ];
  const [selectedOption, setSelectedOption] = useState<any>("");
  const handleChange = (selected: any = {}) => {
    setSelectedOption(selected);
  };
  const [grade, setGrade] = useState("");
  useEffect(() => {
    if (selectedOption) {
      setGrade(selectedOption.value);
    }
  }, [selectedOption]);

  const forwholist = [
    {
      label: "서폿",
      value: "서폿",
    },
    {
      label: "딜러",
      value: "딜러",
    },
  ];
  const [selectedOption8, setSelectedOption8] = useState<any>("");
  const handleChange8 = (selected: any = {}) => {
    setSelectedOption8(selected);
  };
  const [forwho, setForwho] = useState("");
  useEffect(() => {
    if (selectedOption8) {
      setForwho(selectedOption8.value);
    }
  }, [selectedOption8]);

  const categorylist = [
    {
      label: "목걸이",
      value: "목걸이",
    },
    {
      label: "귀걸이",
      value: "귀걸이",
    },
    {
      label: "반지",
      value: "반지",
    },
  ];
  const [selectedOption2, setSelectedOption2] = useState<any>("");
  const handleChange2 = (selected: any = {}) => {
    setSelectedOption2(selected);
  };
  const [category, setCategory] = useState("");
  useEffect(() => {
    if (selectedOption2) {
      setStat2("");
      setStat2num(0);
      setSelectedOption4("");
      setCategory(selectedOption2.value);
    }
  }, [selectedOption2]);

  const statlist = [
    {
      label: "치명",
      value: "치명",
    },
    {
      label: "신속",
      value: "신속",
    },
    {
      label: "특화",
      value: "특화",
    },
    {
      label: "숙련",
      value: "숙련",
    },
    {
      label: "인내",
      value: "인내",
    },
    {
      label: "제압",
      value: "제압",
    },
  ];

  const [selectedOption3, setSelectedOption3] = useState<any>("");
  const handleChange3 = (selected: any = {}) => {
    setSelectedOption3(selected);
  };
  const [stat, setStat] = useState("");
  useEffect(() => {
    if (selectedOption3) {
      setStat(selectedOption3.value);
    }
  }, [selectedOption3]);

  const [selectedOption4, setSelectedOption4] = useState<any>("");
  const handleChange4 = (selected: any = {}) => {
    setSelectedOption4(selected);
  };
  const [stat2, setStat2] = useState("");
  useEffect(() => {
    if (selectedOption4) {
      setStat2(selectedOption4.value);
    }
  }, [selectedOption4]);

  const [statnum, setStatnum] = useState(0);
  const handleQuantityChange3 = (e: string) => {
    setStatnum(Number(e));
  };

  const [stat2num, setStat2num] = useState(0);
  const handleQuantityChange4 = (e: string) => {
    setStat2num(Number(e));
  };

  const [selectedOption5, setSelectedOption5] = useState<any>("");
  const handleChange5 = (selected: any = {}) => {
    setSelectedOption5(selected);
  };
  const [skill, setSkill] = useState("");
  useEffect(() => {
    if (selectedOption5) {
      setSkill(selectedOption5.value);
    }
  }, [selectedOption5]);

  const [selectedOption6, setSelectedOption6] = useState<any>("");
  const handleChange6 = (selected: any = {}) => {
    setSelectedOption6(selected);
  };
  const [skill2, setSkill2] = useState("");
  useEffect(() => {
    if (selectedOption6) {
      setSkill2(selectedOption6.value);
    }
  }, [selectedOption6]);

  const [skillnum, setSkillnum] = useState(0);
  const handleQuantityChange5 = (e: string) => {
    setSkillnum(Number(e));
  };

  const [skill2num, setSkill2num] = useState(0);
  const handleQuantityChange6 = (e: string) => {
    setSkill2num(Number(e));
  };

  const panaltylist = [
    {
      label: "공격력감소",
      value: "공격력감소",
    },
    {
      label: "공격속도감소",
      value: "공격속도감소",
    },
    {
      label: "방어력감소",
      value: "방어력감소",
    },
    {
      label: "이동속도감소",
      value: "이동속도감소",
    },
  ];
  const [selectedOption7, setSelectedOption7] = useState<any>("");
  const handleChange7 = (selected: any = {}) => {
    setSelectedOption7(selected);
  };
  const [panalty, setPanalty] = useState("");
  useEffect(() => {
    if (selectedOption7) {
      setPanalty(selectedOption7.value);
    }
  }, [selectedOption7]);

  const [panaltynum, setPanaltynum] = useState(0);
  const handleQuantityChange7 = (e: string) => {
    setPanaltynum(Number(e));
  };

  const [itemlist, setItemlist] = useState<any>([]);
  const saveItem = () => {
    let newdata: any = {
      _id: [uuidv4()],
      grade: [],
      forwho: [],
      category: [],
      stat: {},
      skill: {},
      panalty: {},
      location: [],
    };
    newdata.grade.push(grade);
    newdata.forwho.push(forwho);
    newdata.category.push(category);
    newdata.location.push(location);

    if (stat2 != "") {
      newdata["stat"] = { [stat]: statnum, [stat2]: stat2num };
    } else {
      newdata["stat"] = { [stat]: statnum };
    }

    if (skill2 != "") {
      newdata["skill"] = { [skill]: skillnum, [skill2]: skill2num };
    } else {
      newdata["skill"] = { [skill]: skillnum };
    }
    newdata["panalty"] = { [panalty]: panaltynum };

    setItemlist([newdata, ...itemlist]);
  };

  useEffect(() => {
    localStorage.setItem("itemlist", JSON.stringify(itemlist));
  }, [itemlist]);
  const [hasskilllist, setHasskilllist] = useState<any>([]);

  const [selectedOption10, setSelectedOption10] = useState<any>("");
  const handleChange10 = (selected: any = {}) => {
    setSelectedOption10(selected);
  };
  const [hasskill, setHasskill] = useState("");
  useEffect(() => {
    if (selectedOption10) {
      setHasskill(selectedOption10.value);
    }
  }, [selectedOption10]);

  const [hasskillnum, setHasskillnum] = useState(0);
  const handleQuantityChange10 = (e: string) => {
    setHasskillnum(Number(e));
  };

  const saveHasskill = () => {
    let newdata = {
      _id: [uuidv4()],
      category: ["장착 각인"],
      skill: {},
    };
    newdata["skill"] = {
      [hasskill]: hasskillnum,
    };

    setHasskilllist([...hasskilllist, newdata]);
  };
  useEffect(() => {
    localStorage.setItem("hasskilllist", JSON.stringify(hasskilllist));
  }, [hasskilllist]);

  const [selectedOption12, setSelectedOption12] = useState<any>("");
  const handleChange12 = (selected: any = {}) => {
    setSelectedOption12(selected);
  };
  const [abillityskill, setAbillityskill] = useState("");
  useEffect(() => {
    if (selectedOption12) {
      setAbillityskill(selectedOption12.value);
    }
  }, [selectedOption12]);

  const [abillityskillnum, setAbillityskillnum] = useState(0);
  const handleQuantityChange12 = (e: string) => {
    setAbillityskillnum(Number(e));
  };

  const [selectedOption13, setSelectedOption13] = useState<any>("");
  const handleChange13 = (selected: any = {}) => {
    setSelectedOption13(selected);
  };
  const [abillityskill2, setAbillityskill2] = useState("");
  useEffect(() => {
    if (selectedOption13) {
      setAbillityskill2(selectedOption13.value);
    }
  }, [selectedOption13]);

  const [abillityskill2num, setAbillityskill2num] = useState(0);
  const handleQuantityChange13 = (e: string) => {
    setAbillityskill2num(Number(e));
  };

  const [selectedOption14, setSelectedOption14] = useState<any>("");
  const handleChange14 = (selected: any = {}) => {
    setSelectedOption14(selected);
  };
  const [abillitypanalty, setAbillitypanalty] = useState("");
  useEffect(() => {
    if (selectedOption14) {
      setAbillitypanalty(selectedOption14.value);
    }
  }, [selectedOption14]);

  const [abillitypanaltynum, setAbillitypanaltynum] = useState(0);
  const handleQuantityChange14 = (e: string) => {
    setAbillitypanaltynum(Number(e));
  };

  const [abilltylist, setAbilltylist] = useState<any>([]);

  const saveAbillity = () => {
    let newdata = {
      _id: [uuidv4()],
      category: ["어빌돌"],
      skill: {},
      panalty: {},
    };
    newdata["skill"] = {
      [abillityskill]: abillityskillnum,
      [abillityskill2]: abillityskill2num,
    };
    newdata["panalty"] = { [abillitypanalty]: abillitypanaltynum };

    setAbilltylist([...abilltylist, newdata]);
  };
  useEffect(() => {
    localStorage.setItem("abilltylist", JSON.stringify(abilltylist));
  }, [abilltylist]);
  const gradelist2 = [
    {
      label: "유물",
      value: "유물",
    },
    {
      label: "고대",
      value: "고대",
    },
  ];
  const [selectedOption16, setSelectedOption16] = useState<any>("");
  const handleChange16 = (selected: any = {}) => {
    setSelectedOption16(selected);
  };
  const [conforwho, setConforwho] = useState("");
  useEffect(() => {
    if (selectedOption16) {
      setConforwho(selectedOption16.value);
    }
  }, [selectedOption16]);

  const [selectedOption17, setSelectedOption17] = useState<any>("");
  const handleChange17 = (selected: any = {}) => {
    setSelectedOption17(selected);
  };
  const [congrade, setCongrade] = useState("");
  useEffect(() => {
    if (selectedOption17) {
      setCongrade(selectedOption17.value);
    }
  }, [selectedOption17]);

  const [selectedOption18, setSelectedOption18] = useState<any>("");
  const handleChange18 = (selected: any = {}) => {
    setSelectedOption18(selected);
  };
  const [constat, setConstat] = useState("");
  useEffect(() => {
    if (selectedOption18) {
      setConstat(selectedOption18.value);
    }
  }, [selectedOption18]);

  const [constatnum, setConstatnum] = useState(0);
  const handleQuantityChange18 = (e: string) => {
    setConstatnum(Number(e));
  };

  const [constatlist, setConstatlist] = useState<any>([]);
  const saveConstatlist = () => {
    let newdata = {
      [constat]: constatnum,
    };
    setConstatlist([...constatlist, newdata]);
  };

  const [selectedOption19, setSelectedOption19] = useState<any>("");
  const handleChange19 = (selected: any = {}) => {
    setSelectedOption19(selected);
  };
  const [constat2, setConstat2] = useState("");
  useEffect(() => {
    if (selectedOption19) {
      setConstat2(selectedOption19.value);
    }
  }, [selectedOption19]);

  const [constat2num, setConstat2num] = useState(0);
  const handleQuantityChange19 = (e: string) => {
    setConstat2num(Number(e));
  };

  const [selectedOption20, setSelectedOption20] = useState<any>("");
  const handleChange20 = (selected: any = {}) => {
    setSelectedOption20(selected);
  };
  const [constat3, setConstat3] = useState("");
  useEffect(() => {
    if (selectedOption20) {
      setConstat3(selectedOption20.value);
    }
  }, [selectedOption20]);

  const [constat3num, setConstat3num] = useState(0);
  const handleQuantityChange20 = (e: string) => {
    setConstat3num(Number(e));
  };

  const [selectedOption21, setSelectedOption21] = useState<any>("");
  const handleChange21 = (selected: any = {}) => {
    setSelectedOption21(selected);
  };
  const [conpanaltylist, setConpanaltylist] = useState<any>([]);
  useEffect(() => {
    if (selectedOption21) {
      setConpanaltylist([...conpanaltylist, selectedOption21.value]);
    }
  }, [selectedOption21]);

  const [selectedOption23, setSelectedOption23] = useState<any>("");
  const handleChange23 = (selected: any = {}) => {
    setSelectedOption23(selected);
  };
  const [conaskill, setConaskill] = useState([]);
  useEffect(() => {
    if (selectedOption23) {
      const newarray: any = [...conaskill, selectedOption23.value];
      setConaskill(newarray);
    }
  }, [selectedOption23]);

  const [selectedOption22, setSelectedOption22] = useState<any>("");
  const handleChange22 = (selected: any = {}) => {
    setSelectedOption22(selected);
  };
  const [conexskill, setConexskill] = useState([]);
  useEffect(() => {
    if (selectedOption22) {
      const newarray: any = [...conexskill, selectedOption22.value];
      setConexskill(newarray);
    }
  }, [selectedOption22]);

  const saveHasItemList = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Item: itemlist,
        ID: loginstate.ID,
      }),
    };

    fetch(
      process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL + "/update3",
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
  };

  const loadHasItemList = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ID: loginstate.ID,
      }),
    };
    fetch(
      process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL + "/hasitemload",
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
        setItemlist([...data[0].Item]);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  function deletelist(index: number) {
    let newarray = [...itemlist];
    newarray.splice(index, 1);
    setItemlist(newarray);
  }

  function deletelist2(index: number) {
    let newarray = [...hasskilllist];
    newarray.splice(index, 1);
    setHasskilllist(newarray);
  }
  function deletelist3(index: number) {
    let newarray = [...abilltylist];
    newarray.splice(index, 1);
    setAbilltylist(newarray);
  }
  function deletelist4(index: number) {
    let newarray = [...conaskill];
    newarray.splice(index, 1);
    setConaskill(newarray);
  }
  function deletelist5(index: number) {
    let newarray = [...conexskill];
    newarray.splice(index, 1);
    setConexskill(newarray);
  }
  function deletelist6(index: number) {
    let newarray = [...conpanaltylist];
    newarray.splice(index, 1);
    setConpanaltylist(newarray);
  }
  function deletelist7(index: number) {
    let newarray = [...constatlist];
    newarray.splice(index, 1);
    setConstatlist(newarray);
  }

  const wantskilllist = [
    {
      label: "3333+",
      value: 20,
    },
    {
      label: "33331+",
      value: 21,
    },
    {
      label: "333321+",
      value: 24,
    },
    {
      label: "33333+",
      value: 25,
    },
    {
      label: "333331+",
      value: 26,
    },
  ];
  const [selectedOption30, setSelectedOption30] = useState<any>("");
  const handleChange30 = (selected: any = {}) => {
    setSelectedOption30(selected);
  };
  const [ojbcount, setOjbcount] = useState(0);
  useEffect(() => {
    if (selectedOption30) {
      setOjbcount(selectedOption30.value);
    }
  }, [selectedOption30]);

  const [result, setResult] = useState<any>([]);

  function getCombinations(
    //n개 조합 추출 모든 경우의 수 배열화
    arr: any,
    newarr: any,
    selectCount: any,
    startIndex = 0,
    currentCombination: any = []
  ) {
    if (selectCount === 0) {
      //각인 어빌 조합 반복으로 생성
      newarr.push(currentCombination.slice());
      // console.log(currentCombination);
      return;
    }

    for (let i = startIndex; i < arr.length; i++) {
      currentCombination.push(arr[i]);
      getCombinations(arr, newarr, selectCount - 1, i + 1, currentCombination);
      currentCombination.pop();
    }
  }

  function checkcon(data: any) {
    //data 조합이 갖춰진 상태
    let conbin: any = {
      _id: [],
      category: [],
      stat: {},
      skill: {},
      panalty: {},
      forwho: [],
      grade: [],
      location: [],
    };
    for (let obj of data) {
      for (let key in obj) {
        if (conbin.hasOwnProperty(key)) {
          // 있다면,
          if (Array.isArray(obj[key])) {
            conbin[key].push(obj[key][0]);
          } else {
            for (let key2 in obj[key]) {
              if (conbin[key].hasOwnProperty(key2)) {
                //같은 키가 있다면 숫자를 더함
                conbin[key][key2] += obj[key][key2];
              } else {
                //없다면 키값쌍을 더한다.
                conbin[key][key2] = obj[key][key2];
              }
            }
          }
          //키 값에 객체의 객체로 들어가는데
        } else {
          // conbin에 부위 스탯 각인 패널티가 없다면
          conbin[key] = obj[key];
        }
      }
    }
    // conaskill.every(e=>Object.keys(conbin.skill).includes(e))
    // const newarray4 = data.some((e) =>
    //   Object.keys(e.skill).some((i) => conaskill.includes(i))
    // );}

    // const newarray5 = data.some((e) =>
    //   Object.keys(e.panalty).some((i) => conpanaltylist.includes(i))
    // );

    //각인 조건 검색

    // if (Object.keys(conbin["skill"]).length <= 10) {
    let count = 0;
    if (Object.keys(conbin["skill"]).length <= 6) {
      for (let key in conbin["skill"]) {
        if (conbin["skill"][key] >= 15) {
          count += 5;
        } else if (conbin["skill"][key] >= 10) {
          count += 3;
        } else if (conbin["skill"][key] >= 5) {
          count += 1;
        }
        if (count >= ojbcount) {
          //목표각인, 포함각인, 예외각인, 스탯123설정,딜러 서폿, 유물만 고대만 혼합,
          setResult([...result, conbin]);
        }
      }
    }

    // }
  }
  function maker() {
    setResult([]);
    // if (conforwho != "") {
    //   setItemlist([...itemlist.filter((e) => e.forwho[0] === conforwho)]);
    // }
    // if (congrade != "") {
    //   setItemlist([...itemlist.filter((e) => e.grade[0] === congrade)]);
    // }
    // if (constatlist.length >= 1) {
    //   setItemlist([
    //     ...itemlist.filter((e) =>
    //       Object.keys(e.stat).every((i) =>
    //         constatlist.map((j) => Object.keys(j)[0]).includes(i)
    //       )
    //     ),
    //   ]);
    // }
    let itemAlist = itemlist.filter((e: any) => e.category[0] === "목걸이");
    let itemElist2 = itemlist.filter((e: any) => e.category[0] === "귀걸이");
    let itemRlist2 = itemlist.filter((e: any) => e.category[0] === "반지");
    let itemElist: any = [];
    let itemRlist: any = [];
    let conbinskill: any = [];
    getCombinations(itemElist2, itemElist, 2);
    getCombinations(itemRlist2, itemRlist, 2);
    getCombinations(hasskilllist, conbinskill, 2);
    for (let a of itemElist) {
      for (let b of itemRlist) {
        for (let c of conbinskill) {
          for (let d of itemAlist) {
            for (let e of abilltylist) {
              let data = [...a, ...b, ...c, d, e];
              checkcon(data);
            }
          }
        }
      }
    }

    openModal();
  }
  const [viewcobin, setViewcobin] = useState<any>([]);
  function viewconbin(index: any) {
    setViewcobin([]);
    let arr = [...result[index]._id];
    let data = [...itemlist, ...hasskilllist, ...abilltylist];
    for (let e of arr) {
      for (let i of data) {
        if (i._id[0] === e) {
          setViewcobin((prevViewcobin: any) => [...prevViewcobin, i]);
        }
      }
    }
  }
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row  ">
        <div className="grid grid-cols-4 gap-1 p-1 m-1 ">
          <div className="col-span-4 text-2xl  ">악세추가</div>
          <div className="col-span-4 flex flex-row  ">
            <Select
              options={Array.isArray(forwholist) ? forwholist : []}
              value={selectedOption8}
              onChange={handleChange8}
              isSearchable={true} // 검색 가능한 드롭다운으로 설정
              placeholder="용도"
            />

            <Select
              options={Array.isArray(gradelist) ? gradelist : []}
              value={selectedOption}
              onChange={handleChange}
              isSearchable={true} // 검색 가능한 드롭다운으로 설정
              placeholder="등급"
            />
            <Select
              options={Array.isArray(categorylist) ? categorylist : []}
              value={selectedOption2}
              onChange={handleChange2}
              isSearchable={true} // 검색 가능한 드롭다운으로 설정
              placeholder="부위"
            />
          </div>
          <div className="col-span-4 flex flex-row  ">
            <div className=" flex flex-row  ">
              <Select
                options={Array.isArray(statlist) ? statlist : []}
                value={selectedOption3}
                onChange={handleChange3}
                isSearchable={true} // 검색 가능한 드롭다운으로 설정
                placeholder="스텟1"
              />
              <input
                className="w-2/6 h-2/3  rounded-lg text-right "
                type="number"
                value={statnum}
                onChange={(e) => handleQuantityChange3(e.target.value)}
              ></input>
            </div>
            <div
              className={` flex flex row  ${
                category === "목걸이" ? "opacity-1" : "opacity-0"
              }`}
            >
              <Select
                options={Array.isArray(statlist) ? statlist : []}
                value={selectedOption4}
                onChange={handleChange4}
                isSearchable={true} // 검색 가능한 드롭다운으로 설정
                placeholder="스텟2"
              />
              <input
                className="w-2/6 h-2/3 rounded-lg text-right "
                type="number"
                value={stat2num}
                onChange={(e) => handleQuantityChange4(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="flex flex row col-span-2">
            <Select
              options={Array.isArray(newskilllist) ? newskilllist : []}
              value={selectedOption5}
              onChange={handleChange5}
              isSearchable={true} // 검색 가능한 드롭다운으로 설정
              placeholder="각인1"
            />
            <input
              className="w-2/6 h-2/3  rounded-lg text-right "
              type="number"
              value={skillnum}
              onChange={(e) => handleQuantityChange5(e.target.value)}
            ></input>
          </div>
          <div className="flex flex row col-span-2">
            <Select
              options={Array.isArray(newskilllist) ? newskilllist : []}
              value={selectedOption6}
              onChange={handleChange6}
              isSearchable={true} // 검색 가능한 드롭다운으로 설정
              placeholder="각인2"
            />
            <input
              className="w-2/6 h-2/3 rounded-lg text-right "
              type="number"
              value={skill2num}
              onChange={(e) => handleQuantityChange6(e.target.value)}
            ></input>
          </div>
          <div className="flex flex row col-span-2">
            <Select
              options={Array.isArray(panaltylist) ? panaltylist : []}
              value={selectedOption7}
              onChange={handleChange7}
              isSearchable={true} // 검색 가능한 드롭다운으로 설정
              placeholder="패널티"
            />
            <input
              className="w-2/6 h-2/3  rounded-lg text-right "
              type="number"
              value={panaltynum}
              onChange={(e) => handleQuantityChange7(e.target.value)}
            ></input>
          </div>
          <input
            className="w-5/6 h-8  rounded-lg text-right col-span-2 "
            type="string"
            value={location}
            placeholder="보유 캐릭터 이름"
            onChange={(e) => handleQuantityChange(e.target.value)}
          ></input>
          <div className="col-span-4">
            <div className="flex flex row justify-between">
              <button
                className="h-8 w-16 bg-green-500 rounded-lg text-white m-1"
                onClick={(e) => saveItem()}
              >
                목록추가
              </button>
              {loginstate && loginstate.isLogin ? (
                <>
                  <button
                    className="h-8 w-16 bg-red-500 rounded-lg text-white m-1"
                    onClick={(e) => saveHasItemList()}
                  >
                    DB저장
                  </button>
                  <button
                    className="h-8 w-24 bg-yellow-500 rounded-lg text-white m-1"
                    onClick={(e) => loadHasItemList()}
                  >
                    DB불러오기
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <div>임시파일정리 시 목록이 제거됩니다</div>
                    <div>로그인하시면 DB에 저장 가능합니다.</div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="col-span-4">
            <div className="text-2xl   ">보유 악세 목록</div>
            <div style={{ maxHeight: "200px", overflowY: "auto" }}>
              <table>
                <thead>
                  <tr>
                    <th className="hidden md:table-cell">분류</th>
                    <th>등급</th>
                    <th className="hidden md:table-cell">부위</th>
                    <th>스텟1</th>
                    <th>스텟2</th>
                    <th>각인1</th>
                    <th>각인2</th>
                    <th className="hidden md:table-cell">패널티</th>
                    <th>위치</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {itemlist.map((e: any, index: any) => (
                    <tr key={index}>
                      <th className="hidden md:table-cell">{e.forwho}</th>
                      <th>{e.grade}</th>

                      <th className="hidden md:table-cell">{e.category}</th>
                      {Object.keys(e.stat).map((key) => (
                        <th key={key}>
                          {key}: {e.stat[key]}
                        </th>
                      ))}
                      {Object.keys(e.stat).length === 1 && <th></th>}
                      {Object.keys(e.skill).map((key) => (
                        <th key={key}>
                          {key.length >= 4 ? key.substring(0, 3) : key}:{" "}
                          {e.skill[key]}
                        </th>
                      ))}
                      {Object.keys(e.panalty).map((key) => (
                        <th key={key} className="hidden md:table-cell">
                          {key.length >= 4 ? key.substring(0, 3) : key}:{" "}
                          {e.panalty[key]}
                        </th>
                      ))}
                      <th>{e.location}</th>
                      <th>
                        <button
                          className="h-8 w-16 bg-red-500 rounded-lg text-white m-1"
                          onClick={() => deletelist(index)}
                        >
                          삭제
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="p-1 ">
          <div className="text-2xl">보유 각인 설정</div>
          <div className="grid grid-cols-4 gap-1">
            <div className="flex flex row col-span-2">
              <Select
                options={Array.isArray(newskilllist) ? newskilllist : []}
                value={selectedOption10}
                onChange={handleChange10}
                isSearchable={true} // 검색 가능한 드롭다운으로 설정
                placeholder="보유 각인"
              />
              <input
                className="w-4/6  rounded-lg text-right "
                type="number"
                value={hasskillnum}
                onChange={(e) => handleQuantityChange10(e.target.value)}
              ></input>
            </div>
            <button
              className="h-8 w-16 bg-green-500 rounded-lg text-white m-1"
              onClick={(e) => saveHasskill()}
            >
              목록추가
            </button>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>보유 각인 목록</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {hasskilllist.map((e: any, index: any) => (
                  <tr key={index}>
                    {Object.keys(e.skill).map((key) => (
                      <th key={key}>
                        {key}: {e.skill[key]}
                      </th>
                    ))}
                    <th>
                      <button
                        className="h-8 w-16 bg-red-500 rounded-lg text-white m-1"
                        onClick={() => deletelist2(index)}
                      >
                        삭제
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="text-2xl  ">어빌설정</div>
            <div className="grid grid-cols-4 gap-4">
              <div className="flex flex row col-span-2">
                <Select
                  options={Array.isArray(skilllist) ? skilllist : []}
                  value={selectedOption12}
                  onChange={handleChange12}
                  isSearchable={true} // 검색 가능한 드롭다운으로 설정
                  placeholder="각인1"
                />
                <input
                  className="w-2/6 h-2/3  rounded-lg text-right "
                  type="number"
                  value={abillityskillnum}
                  onChange={(e) => handleQuantityChange12(e.target.value)}
                ></input>
              </div>
              <div className="flex flex row col-span-2 ">
                <Select
                  options={Array.isArray(skilllist) ? skilllist : []}
                  value={selectedOption13}
                  onChange={handleChange13}
                  isSearchable={true} // 검색 가능한 드롭다운으로 설정
                  placeholder="각인2"
                />
                <input
                  className="w-2/6 h-2/3  rounded-lg text-right "
                  type="number"
                  value={abillityskill2num}
                  onChange={(e) => handleQuantityChange13(e.target.value)}
                ></input>
              </div>
              <div className="flex flex row col-span-3 ">
                <Select
                  options={Array.isArray(panaltylist) ? panaltylist : []}
                  value={selectedOption14}
                  onChange={handleChange14}
                  isSearchable={true} // 검색 가능한 드롭다운으로 설정
                  placeholder="패널티"
                />
                <input
                  className="w-2/6 h-2/3  rounded-lg text-right "
                  type="number"
                  value={abillitypanaltynum}
                  onChange={(e) => handleQuantityChange14(e.target.value)}
                ></input>
              </div>
              <div className="flex flex row ">
                <button
                  className="h-8 w-16 bg-green-500 rounded-lg text-white m-1"
                  onClick={(e) => saveAbillity()}
                >
                  목록추가
                </button>
              </div>
            </div>
            보유 어빌돌
            <table>
              <thead>
                <tr>
                  <th>각인1</th>
                  <th>각인2</th>
                  <th>패널티</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {abilltylist.map((e: any, index: any) => (
                  <tr key={index}>
                    {Object.keys(e.skill).map((key) => (
                      <th key={key}>
                        {key}: {e.skill[key]}
                      </th>
                    ))}
                    <th>
                      {Object.keys(e.panalty).map((key) => (
                        <div key={key}>
                          {key}: {e.panalty[key]}
                        </div>
                      ))}
                    </th>

                    <th>
                      <button
                        className="h-8 w-16 bg-red-500 rounded-lg text-white m-1"
                        onClick={() => deletelist3(index)}
                      >
                        삭제
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <Select
              options={Array.isArray(forwholist) ? forwholist : []}
              value={selectedOption16}
              onChange={handleChange16}
              isSearchable={true} // 검색 가능한 드롭다운으로 설정
              placeholder="용도"
            />
            <Select
              options={Array.isArray(gradelist2) ? gradelist2 : []}
              value={selectedOption17}
              onChange={handleChange17}
              isSearchable={true} // 검색 가능한 드롭다운으로 설정
              placeholder="구성"
            />
            <div className="flex flex row">
              <Select
                options={Array.isArray(statlist) ? statlist : []}
                value={selectedOption18}
                onChange={handleChange18}
                isSearchable={true} // 검색 가능한 드롭다운으로 설정
                placeholder="스텟 설정"
              />
              <input
                className=""
                type="number"
                value={constatnum}
                onChange={(e) => handleQuantityChange18(e.target.value)}
              ></input>
            </div>
            <div className="flex flex row">
              <button onClick={(e) => saveConstatlist()}>목록 추가</button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>스탯 설정 목록</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {constatlist.map((e, index) => (
                  <tr key={index}>
                    {Object.keys(e).map((key) => (
                      <th key={key}>
                        {key}: {e[key]}
                      </th>
                    ))}
                    <th>
                      <button onClick={() => deletelist7(index)}>삭제</button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="">
              <Select
                options={Array.isArray(skilllist) ? skilllist : []}
                value={selectedOption23}
                onChange={handleChange23}
                isSearchable={true} // 검색 가능한 드롭다운으로 설정
                placeholder="필수포함각인"
              />
              <table>
                <thead>
                  <tr>
                    <th>필수포함각인 목록</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {conaskill.map((e, index) => (
                    <tr key={index}>
                      <th>{e}</th>
                      <th>
                        <button onClick={() => deletelist4(index)}>삭제</button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="">
              <Select
                options={Array.isArray(skilllist) ? skilllist : []}
                value={selectedOption22}
                onChange={handleChange22}
                isSearchable={true} // 검색 가능한 드롭다운으로 설정
                placeholder="예외각인설정"
              />
              <table>
                <thead>
                  <tr>
                    <th>예외각인설정 목록</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {conexskill.map((e, index) => (
                    <tr key={index}>
                      <th>{e}</th>
                      <th>
                        <button onClick={() => deletelist5(index)}>삭제</button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="">
              <Select
                options={Array.isArray(panaltylist) ? panaltylist : []}
                value={selectedOption21}
                onChange={handleChange21}
                isSearchable={true} // 검색 가능한 드롭다운으로 설정
                placeholder="허용 패널티"
              />
              <table>
                <thead>
                  <tr>
                    <th>허용 패널티 목록</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {conpanaltylist.map((e, index) => (
                    <tr key={index}>
                      <th>{e}</th>
                      <th>
                        <button onClick={() => deletelist6(index)}>삭제</button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> */}
            <div className="text-2xl  ">목표 각인 설정</div>
            <Select
              options={Array.isArray(wantskilllist) ? wantskilllist : []}
              value={selectedOption30}
              onChange={handleChange30}
              isSearchable={true} // 검색 가능한 드롭다운으로 설정
              placeholder="목표각인"
            />
            <div className="flex flex row">
              <button
                className="h-8 w-16 bg-blue-500 rounded-lg text-white m-1"
                onClick={() => maker()}
              >
                검색
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="text-2xl  ">탐색 결과</div>
        <table>
          <thead>
            {result.map((e: any, index: any) => (
              <tr key={index}>
                {Object.keys(e.stat).map((key, index) => (
                  <th key={index}>{index === 0 ? "스탯" : ""}</th>
                ))}

                {Object.keys(e.skill).map((key, index) => (
                  <th key={index}>{index === 0 ? "각인" : ""}</th>
                ))}

                {Object.keys(e.panalty).map((key, index) => (
                  <th key={index}>{index === 0 ? "패널티" : ""}</th>
                ))}
                <th>조합확인</th>
              </tr>
            ))}
          </thead>
          <tbody>
            {result.map((e: any, index: any) => (
              <tr key={index}>
                {Object.keys(e.stat).map((key) => (
                  <th key={key}>
                    {key}: {e.stat[key]}
                  </th>
                ))}
                {Object.keys(e.skill).map((key) => (
                  <th key={key}>
                    {key.length >= 4 ? key.substring(0, 3) : key}:{" "}
                    {e.skill[key]}
                  </th>
                ))}
                {Object.keys(e.panalty).map((key) => (
                  <th key={key}>
                    {key.length >= 4 ? key.substring(0, 3) : key}:{" "}
                    {e.panalty[key]}
                  </th>
                ))}
                <th>
                  <button
                    className="h-8 w-16 bg-green-500 rounded-lg text-white m-1"
                    onClick={() => viewconbin(index)}
                  >
                    확인
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        조합확인
        <table>
          <thead></thead>
          <tbody>
            {viewcobin.map((e: any, index: any) => (
              <tr key={index}>
                {e.category
                  ? Object.keys(e.category).map((key) => (
                      <th key={key}>{e.category[key]}</th>
                    ))
                  : ""}
                {Object.keys(e.skill).map((key) => (
                  <th key={key}>
                    {key}: {e.skill[key]}
                  </th>
                ))}
                {e.stat
                  ? Object.keys(e.stat).map((key) => (
                      <th key={key}>
                        {key}: {e.stat[key]}
                      </th>
                    ))
                  : ""}

                {e.location
                  ? Object.keys(e.location).map((key) => (
                      <th key={key}>{e.location[key]}</th>
                    ))
                  : ""}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PopupModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        message="목표각인에 해당되는 조합이 없으면 아무것도 나타나지 않습니다."
      />
    </div>
  );
}
