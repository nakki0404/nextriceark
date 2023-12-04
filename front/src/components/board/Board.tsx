"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTextListQuery } from "@/hooks/api/useTextListQuery";
import { useAppSelector } from "@/store/store";
import PopupModal from "@/components/common/PopupModal";
import PopupInputModal from "@/components/common/PopupInputModal";
import type { Text } from "@/types/Text";

export default function Board() {
  const router = useRouter();
  const loginstate = useAppSelector((state: any) => state.loginstatereducer);

  const data = useTextListQuery();
  // console.log(data);
  const sortedPosts = data.TextList.sort((a, b) => {
    const categoryOrder =
      getCategoryOrder(a.Category) - getCategoryOrder(b.Category);
    if (categoryOrder !== 0) {
      return categoryOrder;
    }
    return (new Date(b.Date).getTime() - new Date(a.Date).getTime()) as number;
  });
  function getCategoryOrder(category: string) {
    switch (category) {
      case "공지":
        return 0;
      case "자유":
        return 1;
      default:
        return 2;
    }
  }
  const [passWord, setPassWord] = useState<string | undefined>(undefined); // 게시판 목록
  const [_id, set_id] = useState(""); // 게시판 목록

  const [posts, setPosts] = useState<Text[]>([]); // 게시판 목록
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const getCurrentPagePosts = (): Text[] => {
    const itemsPerPage = 10; // 페이지당 보여줄 게시물 수
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedPosts.slice(startIndex, endIndex);
  };
  useEffect(() => {
    // Set the initial posts after the component has mounted

    setPosts(getCurrentPagePosts());
  }, [data.TextList]); // E
  useEffect(() => {
    setPosts(getCurrentPagePosts());
  }, [currentPage]);

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
    if (passWord === result.Input) {
      router.push(`/Board/${_id}`);
    } else {
      openModal5();
    }
  };

  const [isModalOpen5, setModalOpen5] = useState(false);

  const openModal5 = () => {
    setModalOpen5(true);
  };

  const closeModal5 = () => {
    setModalOpen5(false);
  };
  const viewLogic = async (item: Text) => {
    setPassWord(item.FakePassWord);
    set_id(item._id);
    if (
      item.Category2 === "공개" ||
      loginstate.ID === "adminim" ||
      loginstate.ID === item.ID
    ) {
      router.push(`/Board/${item._id}`);
    } else if (item.FakePassWord) {
      handleOpenModal3();
    } else {
      openModal5();
    }
  };

  // const editLogic = () => {
  //   //글 자체가 회원글 vs 비회원글
  //   if (text?.FakeID) {
  //     //비회원 삭제
  //     handleOpenModal3();
  //   } else if (text?.ID === loginstate.ID || loginstate.ID === "adminim") {
  //     handleOpenModal4();
  //   } else {
  //     openModal5();
  //     setTimeout(() => {
  //       router.push(`/Board/View/${params.slug}`);
  //     }, 500);
  //   }
  // };
  // ///

  // useEffect(() => {
  //   editLogic();
  // }, []);

  return (
    <div className="w-fit md:w-[50vw]">
      <h1 className="text-2xl p-4 ">게시판</h1>
      <div className="grid grid-cols-12   gap-1 ">
        <div className="col-span-3 md:col-span-2 p-1">말머리</div>
        <div className="col-span-9 md:col-span-6 p-1">글제목</div>
        <div className=" md:col-span-2 p-1 md:block hidden">글쓴이</div>
        <div className=" md:col-span-2 p-1 md:block hidden">날짜</div>
        {posts.map((item, index) => (
          <div
            className="flex flex-row col-span-12 cursor-pointer border-t border-yellow-900 p-1"
            key={index}
            onClick={() => viewLogic(item)}
          >
            <div className="basis-3/12 md:basis-2/12">{item.Category}</div>
            <div className="basis-9/12 md:basis-6/12 flex flex-row">
              <div>
                {item.Category2 === "비밀"
                  ? "비밀글 : 관리자만 볼 수 있습니다."
                  : item.TextTitle}
              </div>
              <div
                className={`text-xs text-red-500 ${
                  //(new Date(b.Date).getTime() - new Date(a.Date).getTime()) as number;
                  (new Date().getTime() - new Date(item.Date).getTime()) /
                    (60 * 60 * 1000) <
                  24
                    ? "animate-pulse"
                    : "hidden"
                }`}
              >
                new!!!
              </div>
            </div>
            <div className="basis-2/12 md:block hidden">
              {item.ID
                ? item.ID === "adminim"
                  ? "관리자"
                  : item.ID
                : item.FakeID}
            </div>
            <div className="basis-2/12 md:block hidden">
              {item.Date ? new Date(item.Date).toISOString().split("T")[0] : ""}
            </div>
          </div>
        ))}

        <button className="col-span-12 justify-self-end h-8 w-16 bg-green-500 rounded-lg text-white m-1 ">
          <Link href="/Board/Write">글쓰기</Link>
        </button>
        <div className="col-span-12 justify-self-center">
          {Array.from(
            { length: Math.ceil(sortedPosts.length / 10) },
            (_, index) => (
              <button
                className="text-lg m-2 "
                key={index + 1}
                onClick={() => handlePageClick(index + 1)}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
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
    </div>
  );
}
