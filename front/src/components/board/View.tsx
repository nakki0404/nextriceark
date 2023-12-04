"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useTextList } from "@/hooks/useTextList";
import { useDeleteTextListMutation } from "@/hooks/api/useDeleteTextListMutation";
import PopupInputModal from "@/components/common/PopupInputModal";
import { useAppSelector } from "@/store/store";
import PopupBooleanModal from "@/components/common/PopupBooleanModal";
import PopupModal from "@/components/common/PopupModal";
import type { Text } from "@/types/Text";
import { useTextListQuery } from "@/hooks/api/useTextListQuery";
import { useUpdateTextListMutation } from "@/hooks/api/useUpdateTextListMutation";
import Select from "react-select";
import checkTextList from "@/api/checkTextList";
import deleteTextList from "@/api/deleteTextList";

export default function View() {
  const loginstate = useAppSelector((state: any) => state.loginstatereducer);
  const [isEdit, setIsEdit] = useState(false);
  const data = useTextList();
  const deleteMutation = useDeleteTextListMutation();
  const params = useParams();
  const router = useRouter();
  const textList: Text[] = data.textList;
  const text: Text | undefined = textList.find(
    (item: Text) => item._id === params.slug
  );

  const [isPopupModalOpen, setPopupModalOpen] = useState(false);
  const openPopupModal = () => {
    setPopupModalOpen(true);
  };

  const closePopupModal = () => {
    setPopupModalOpen(false);
  };

  const [isInputModalOpen, setInputModalOpen] = useState(false);
  const openInputModal = () => {
    setInputModalOpen(true);
  };

  const handleInputModalClose = async (
    confirmed: boolean,
    confirmedInput?: string
  ) => {
    setInputModalOpen(false);
    const result = await new Promise<{ Pass: boolean; Input?: string }>(
      (resolve) => {
        const inputData = {
          Pass: confirmed,
          Input: confirmedInput,
        };
        resolve(inputData);
      }
    );
    if (result?.Pass === true) {
      // deleteMutation.mutate({
      //   slug: params.slug,
      //   input: result.Input,
      // });
      try {
        const delete2 = await deleteTextList({
          slug: params.slug,
          input: result.Input,
        });
        if (!delete2) {
          openPopupModal();
        }
      } catch (error: any) {
        console.error("삭제 오류 발생:", error.message);
        openPopupModal(); // 삭제 중에 오류가 발생한 경우도 모달을 열 수 있도록 처리
      }
    }
  };

  const [isBooleanModalOpen, setBooleanModalOpen] = useState(false);
  const openBooleanModal = () => {
    setBooleanModalOpen(true);
  };
  const handleBooleanModalClose = async (confirmed: boolean) => {
    setBooleanModalOpen(false);
    const result = await new Promise<{ Pass: boolean; ID: string }>(
      (resolve) => {
        const inputData = {
          Pass: confirmed,
          ID: loginstate.ID,
        };
        resolve(inputData);
      }
    );
    if (result?.Pass == true) {
      deleteMutation.mutate({ slug: params.slug, ID: result.ID });
      router.push(`/Board`);
    } else {
    }
  };
  //팝업
  // const [isPopupModalOpen, setPopupModalOpen] = useState(false);
  // const openPopupModal = () => {
  //   setPopupModalOpen(true);
  // };

  // const closePopupModal = () => {
  //   setPopupModalOpen(false);
  // };
  //
  const deleteLogic = () => {
    //글 자체가 회원글 vs 비회원글
    if (text?.FakeID && loginstate.ID !== "adminim") {
      //비회원 삭제
      openInputModal();
    } else if (text?.ID === loginstate.ID || loginstate.ID === "adminim") {
      openBooleanModal();
    } else {
      openPopupModal();
    }
  };
  ///// 수정파트
  const dataEdit = useTextListQuery();
  const textEdit = dataEdit.TextList.find((item) => item._id === params.slug);
  const updateMutation = useUpdateTextListMutation();

  const [category2, setCategory2] = useState(textEdit?.Category2);
  const changeCategory2 = (selected: any) => {
    setCategory2(selected.value);
  };

  const [category, setCategory] = useState(textEdit?.Category);
  const changeCategory = (selected: any = {}) => {
    setCategory(selected.value);
  };
  const [textTitle, setTextTitle] = useState(textEdit?.TextTitle);
  const changeTextTitle = (e: any) => {
    setTextTitle(e.target.value);
  };
  const [textBody, setTextBody] = useState(textEdit?.TextBody);
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
      setIsEdit(false);
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
      setIsEdit(false);
    } else {
    }
  };
  // const [isModalOpen5, setModalOpen5] = useState(false);

  // const openModal5 = () => {
  //   setModalOpen5(true);
  // };

  // const closeModal5 = () => {
  //   setModalOpen5(false);
  // };

  ///
  // const [isModalOpen3, setModalOpen3] = useState(false);
  // const handleOpenModal3 = () => {
  //   setModalOpen3(true);
  // };
  // const handleModalClose3 = async (
  //   confirmed: boolean,
  //   confirmedInput?: string
  // ) => {
  //   setModalOpen3(false);
  //   const result = await new Promise<{ Pass: boolean; Input?: string }>(
  //     (resolve) => {
  //       const inputData = {
  //         Pass: confirmed,
  //         Input: confirmedInput,
  //       };
  //       resolve(inputData);
  //     }
  //   );

  //   if (result?.Input == text?.FakePassWord) {
  //   } else {
  //     openModal5();
  //     router.push(`/Board/View/${params.slug}`);
  //   }
  // };

  // const [isModalOpen4, setModalOpen4] = useState(false);
  // const handleOpenModal4 = () => {
  //   setModalOpen4(true);
  // };
  // const handleModalClose4 = async (confirmed: boolean) => {
  //   setModalOpen4(false);
  //   const result = await new Promise<{ Pass: boolean; ID?: string }>(
  //     (resolve) => {
  //       const inputData = {
  //         Pass: confirmed,
  //         ID: loginstate.ID,
  //       };
  //       resolve(inputData);
  //     }
  //   );
  //   if (result?.ID == text?.ID || loginstate.ID === "adminim") {
  //     if (result?.Pass === true) {
  //     } else {
  //       router.push(`/Board/View/${params.slug}`);
  //     }
  //   } else {
  //     openModal5();
  //     router.push(`/Board/View/${params.slug}`);
  //   }
  // };

  const editLogic = () => {
    if (text?.FakeID) {
      //서버 검증 로직 필요.

      openInputModal2();
    } else if (text?.ID === loginstate.ID || loginstate.ID === "adminim") {
      setIsEdit(true);
    } else {
      openPopupModal();
    }
  };
  // useEffect(() => {
  //   isEdit&&editLogic();
  // }, [isEdit]);

  const [isInputModalOpen2, setInputModalOpen2] = useState(false);
  const openInputModal2 = () => {
    setInputModalOpen2(true);
  };
  const handleInputModalClose2 = async (
    confirmed: boolean,
    confirmedInput?: string
  ) => {
    setInputModalOpen2(false);
    const result = await new Promise<{ Pass: boolean; Input?: string }>(
      (resolve) => {
        const inputData = {
          Pass: confirmed,
          Input: confirmedInput,
        };
        resolve(inputData);
      }
    );
    if (result?.Pass == true) {
      const fetchData = async () => {
        try {
          const check = await checkTextList({
            slug: params.slug,
            input: result.Input,
          });
          if (check) {
            setIsEdit(check);
          } else {
            openPopupModal();
          }
        } catch (error: any) {
          // 오류 처리
          console.error("에러 발생:", error.message);
        }
      };

      // fetchData 함수 호출
      fetchData();
    } else {
    }
  };

  return (
    <div>
      {!isEdit && (
        <div className="grid grid-cols-12 gap-4  w-fit md:w-[50vw]">
          <div className="col-span-12">제목 : {text?.TextTitle}</div>
          <div className="col-start-1 col-span-3">
            작성자 :{" "}
            {text?.ID
              ? text.ID === "adminim"
                ? "관리자"
                : text.ID
              : text?.FakeID}
          </div>
          <div className="col-span-3 col-start-6">
            작성일 :
            {text ? new Date(text.Date).toISOString().split("T")[0] : ""}
          </div>
          <div className="col-span-12 h-[50vh] whitespace-pre-line">
            {text?.TextBody}
          </div>
          <div className="col-span-12 flex flex-row justify-end">
            <button
              className="h-8 w-16 bg-yellow-500 rounded-lg text-white m-1  "
              onClick={() => editLogic()}
            >
              수정
            </button>
            <button
              className="h-8 w-16 bg-red-500 rounded-lg text-white m-1  "
              onClick={() => deleteLogic()}
            >
              삭제
            </button>
            <button
              className="h-8 w-16 bg-green-500 rounded-lg text-white m-1  "
              onClick={() => {
                router.push(`/Board`);
              }}
            >
              뒤로가기
            </button>
          </div>
          <PopupModal
            isOpen={isPopupModalOpen}
            closeModal={closePopupModal}
            message="권한이 없습니다."
          />
          <PopupInputModal
            isOpen={isInputModalOpen}
            onClose={handleInputModalClose}
            message="비밀번호를 입력하세요."
          />
          <PopupInputModal
            isOpen={isInputModalOpen2}
            onClose={handleInputModalClose2}
            message="비밀번호를 입력하세요."
          />
          <PopupBooleanModal
            isOpen={isBooleanModalOpen}
            onClose={handleBooleanModalClose}
            message="삭제하시겠습니까?"
          />
        </div>
      )}

      {isEdit && (
        <div className="grid grid-cols-3 gap-4  w-fit md:w-[50vw]">
          <h1 className="col-span-3 text-lg">수정하기</h1>
          <div className="col-span-3 flex flex-row justify-start">
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
          <div className="col-span-3 flex flex-row justify-end">
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
              {/* <PopupModal
            isOpen={isModalOpen5}
            closeModal={closeModal5}
            message="권한이 없습니다."
          /> */}
              {/* <PopupInputModal
                isOpen={isModalOpen3}
                onClose={handleModalClose3}
                message="비밀번호를 입력하세요"
              />
              <PopupBooleanModal
                isOpen={isModalOpen4}
                onClose={handleModalClose4}
                message="수정하시겠습니까?"
              /> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
