"use client";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/store/store";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

import PopupBooleanModal from "@/components/common/PopupBooleanModal";
import PopupModal from "@/components/common/PopupModal";
import { useCaptchaCodeQuery } from "@/hooks/api/useCaptchaCodeQuery";
import { useCaptchaCodeMutation } from "@/hooks/api/useCaptchaCodeMutation";
import { v4 as uuidv4 } from "uuid";
import type { Text } from "@/types/Text";

import { usePostTextListMutation } from "@/hooks/api/usePostTextListMutation";

import { useRouter } from "next/navigation";
export default function Write() {
  interface Option {
    label: string;
    value: string;
  }
  const loginstate = useAppSelector((state: any) => state.loginstatereducer);
  const [category, setCategory] = useState<string>("자유");
  const [category2, setCategory2] = useState<string>("공개");
  const router = useRouter();
  const postMutation = usePostTextListMutation();
  const changeCategory = (selected: any) => {
    setCategory(selected.value);
  };
  const changeCategory2 = (selected: any) => {
    setCategory2(selected.value);
  };
  const [textTitle, setTextTitle] = useState("");
  const changeTextTitle = (e: any) => {
    setTextTitle(e.target.value);
  };
  const [textBody, setTextBody] = useState("");
  const changeTextBody = (e: any) => {
    setTextBody(e.target.value);
  };
  const [fakeID, setFakeID] = useState("");
  const changeFakeID = (e: any) => {
    setFakeID(e.target.value);
  };
  const [fakePassWord, setFakePassWord] = useState("");
  const changeFakePassWord = (e: any) => {
    setFakePassWord(e.target.value);
  };

  const { captchaCode } = useCaptchaCodeQuery();
  const mutation = useCaptchaCodeMutation();

  const [inputCaptchaCode, setInputCaptchaCode] = useState("");
  const changeInputCaptchaCode = (value: string) => {
    setInputCaptchaCode(value);
  };

  const typeList: any = [
    {
      label: "공지",
      value: "공지",
    },
    {
      label: "자유",
      value: "자유",
    },
    {
      label: "건의",
      value: "건의",
    },
    {
      label: "에러",
      value: "에러",
    },
  ];

  const typeList2: any = [
    {
      label: "자유",
      value: "자유",
    },
    {
      label: "건의",
      value: "건의",
    },
    {
      label: "에러",
      value: "에러",
    },
  ];
  const typeList3: any = [
    {
      label: "비밀",
      value: "비밀",
    },
    {
      label: "공개",
      value: "공개",
    },
  ];
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
      const uuid = uuidv4();
      const currentDate = new Date();
      const postText = {
        Text: {
          TextTitle: textTitle,
          TextBody: textBody,
          Category: category,
          Category2: category2,
          _id: uuid,
          Date: currentDate,
          ...(loginstate.isLogin
            ? { ID: loginstate.ID }
            : { FakeID: fakeID, FakePassWord: fakePassWord }),
        },
        CaptchaCode: inputCaptchaCode,
      };
      postMutation.mutate(postText);
      router.push("/Board");
    } else {
      setInputCaptchaCode("");
      mutation.mutate(captchaCode);
    }
  };

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
      router.push(`/Board`);
    } else {
    }
  };

  const [isModalOpen4, setModalOpen4] = useState(false);

  const openModal4 = () => {
    setModalOpen4(true);
  };

  const closeModal4 = () => {
    setModalOpen4(false);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <h1 className="col-span-3 text-lg">글쓰기</h1>
      <div className="flex flex-row">
        <Select
          options={loginstate.ID === "adminim" ? typeList : typeList2}
          value={category}
          onChange={changeCategory}
          isSearchable={true} // 검색 가능한 드롭다운으로 설정
          placeholder={category}
        />
        <Select
          options={Array.isArray(typeList3) ? typeList3 : []}
          value={category2}
          onChange={changeCategory2}
          isSearchable={true} // 검색 가능한 드롭다운으로 설정
          placeholder={category2}
        />
      </div>
      <PopupModal
        isOpen={isModalOpen4}
        closeModal={closeModal4}
        message="관리자만 고를 수 있습니다."
      />
      <input
        className={`${loginstate.isLogin === true ? "hidden" : ""}`}
        type="string"
        placeholder="아이디"
        onChange={changeFakeID}
        value={fakeID}
      ></input>
      <input
        className={`${loginstate.isLogin === true ? "hidden" : ""}`}
        type="password"
        placeholder="비밀번호"
        onChange={changeFakePassWord}
        value={fakePassWord}
      ></input>
      <input
        className="col-span-3"
        type="string"
        placeholder="제목을 입력해주세요."
        onChange={changeTextTitle}
        value={textTitle}
      ></input>
      <textarea
        className="col-span-3 h-[50vh]"
        placeholder="내용을 입력해주세요."
        onChange={changeTextBody}
        value={textBody}
      ></textarea>
      <input
        className="w-5/6 m-1 rounded-lg text-right "
        type="string"
        placeholder={`${captchaCode}` + " 자동입력방지 문자"}
        onChange={(e) => changeInputCaptchaCode(e.target.value)}
        value={inputCaptchaCode}
      />
      <div className="col-end-4">
        <div className="flex flex-row">
          <button
            className="h-8 w-16 bg-blue-500 rounded-lg text-white m-1"
            onClick={handleOpenModal}
          >
            저장
          </button>
          <PopupBooleanModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            message="등록하시겠습니까?"
          />
          <button
            className="h-8 w-16 bg-red-500 rounded-lg text-white m-1"
            onClick={handleOpenModal2}
          >
            취소
          </button>
          <PopupBooleanModal
            isOpen={isModalOpen2}
            onClose={handleModalClose2}
            message="취소하시겠습니까?"
          />
        </div>
      </div>
    </div>
  );
}
