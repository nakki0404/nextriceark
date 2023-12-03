"use client";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/store/store";
import Select from "react-select";

import axios from "axios";

import { updateTextList } from "@/store/slices/textlist";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import type { Text } from "@/types/Text";

import PopupBooleanModal from "@/components/common/PopupBooleanModal";
import PopupInputModal from "@/components/common/PopupInputModal";

import PopupModal from "@/components/common/PopupModal";
import { useUpdateTextListMutation } from "@/hooks/api/useUpdateTextListMutation";
import { useTextListQuery } from "@/hooks/api/useTextListQuery";

export default function Edit() {
  const params = useParams();
  const router = useRouter();

  const data = useTextListQuery();
  const text = data.TextList.find((item) => item._id === params.slug);
  const updateMutation = useUpdateTextListMutation();

  const [category2, setCategory2] = useState<string>("공개");
  const changeCategory2 = (selected: any) => {
    setCategory2(selected.value);
  };

  const loginstate = useAppSelector((state: any) => state.loginstatereducer);

  const [category, setCategory] = useState(text?.Category);
  const changeCategory = (selected: any = {}) => {
    setCategory(selected.value);
  };
  const [textTitle, setTextTitle] = useState(text?.TextTitle);
  const changeTextTitle = (e: any) => {
    setTextTitle(e.target.value);
  };
  const [textBody, setTextBody] = useState(text?.TextBody);
  const changeTextBody = (e: any) => {
    setTextBody(e.target.value);
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
      let updateText = {
        TextTitle: textTitle,
        TextBody: textBody,
        Category: category,
        _id: text?._id,
        Date: text?.Date,

        ...(loginstate.isLogin ? { ID: loginstate.ID } : {}),
      };
      updateMutation.mutate(updateText);
      router.push(`/Board/View/${params.slug}`);
    } else {
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
      router.push(`/Board/View/${params.slug}`);
    } else {
    }
  };

  const [isModalOpen5, setModalOpen5] = useState(false);

  const openModal5 = () => {
    setModalOpen5(true);
  };

  const closeModal5 = () => {
    setModalOpen5(false);
  };

  ///
  const [isModalOpen3, setModalOpen3] = useState(false);
  const handleOpenModal3 = () => {
    setModalOpen3(true);
  };
  const handleModalClose3 = async (
    confirmed: boolean,
    confirmedInput?: string
  ) => {
    setModalOpen3(false);
    const result = await new Promise<{ Pass: boolean; Input?: string }>(
      (resolve) => {
        const inputData = {
          Pass: confirmed,
          Input: confirmedInput,
        };
        resolve(inputData);
      }
    );

    if (result?.Input == text?.FakePassWord) {
    } else {
      openModal5();
      router.push(`/Board/View/${params.slug}`);
    }
  };

  const [isModalOpen4, setModalOpen4] = useState(false);
  const handleOpenModal4 = () => {
    setModalOpen4(true);
  };
  const handleModalClose4 = async (confirmed: boolean) => {
    setModalOpen4(false);
    const result = await new Promise<{ Pass: boolean; ID?: string }>(
      (resolve) => {
        const inputData = {
          Pass: confirmed,
          ID: loginstate.ID,
        };
        resolve(inputData);
      }
    );
    if (result?.ID == text?.ID || loginstate.ID === "adminim") {
      if (result?.Pass === true) {
      } else {
        router.push(`/Board/View/${params.slug}`);
      }
    } else {
      openModal5();
      router.push(`/Board/View/${params.slug}`);
    }
  };

  const editLogic = () => {
    //글 자체가 회원글 vs 비회원글
    if (text?.FakeID) {
      //비회원 삭제
      handleOpenModal3();
    } else if (text?.ID === loginstate.ID || loginstate.ID === "adminim") {
      handleOpenModal4();
    } else {
      openModal5();
      setTimeout(() => {
        router.push(`/Board/View/${params.slug}`);
      }, 500);
    }
  };
  ///

  useEffect(() => {
    editLogic();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      <h1 className="col-span-3 text-lg">수정하기</h1>
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
      {/* 
      <input
        className={`${text?.FakeID ? "" : "hidden"}`}
        type="string"
        placeholder="아이디"
        onChange={changeFakeID}
        value={fakeID}
      ></input>
      <input
        className={`${text?.FakeID ? "" : "hidden"}`}
        type="password"
        placeholder="비밀번호"
        onChange={changeFakePassWord}
        value={fakePassWord}
      ></input> */}
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
            message="저장하시겠습니까?"
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
          <PopupModal
            isOpen={isModalOpen5}
            closeModal={closeModal5}
            message="권한이 없습니다."
          />
          <PopupInputModal
            isOpen={isModalOpen3}
            onClose={handleModalClose3}
            message="비밀번호를 입력하세요"
          />
          <PopupBooleanModal
            isOpen={isModalOpen4}
            onClose={handleModalClose4}
            message="수정하시겠습니까?"
          />
        </div>
      </div>
    </div>
  );
}
