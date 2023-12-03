"use client";
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

export default function View() {
  const loginstate = useAppSelector((state: any) => state.loginstatereducer);

  const data = useTextList();
  const deleteMutation = useDeleteTextListMutation();
  const params = useParams();
  const router = useRouter();
  const textList: Text[] = data.textList;
  const text: Text | undefined = textList.find(
    (item: Text) => item._id === params.slug
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleModalClose = async (
    confirmed: boolean,
    confirmedInput?: string
  ) => {
    setModalOpen(false);
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
      deleteMutation.mutate({ slug: params.slug, input: result.Input });
      router.push(`/Board`);
    } else {
    }
  };

  const [isModalOpen2, setModalOpen2] = useState(false);
  const handleOpenModal2 = () => {
    setModalOpen2(true);
  };
  const handleModalClose2 = async (confirmed: boolean) => {
    setModalOpen2(false);
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
  const [isTModalOpen, setTModalOpen] = useState(false);
  const openTModal = () => {
    setTModalOpen(true);
  };

  const closeTModal = () => {
    setTModalOpen(false);
  };
  const deleteLogic = () => {
    //글 자체가 회원글 vs 비회원글
    if (text?.FakeID && loginstate.ID !== "adminim") {
      //비회원 삭제
      handleOpenModal();
    } else if (text?.ID === loginstate.ID || loginstate.ID === "adminim") {
      handleOpenModal2();
    } else {
      openTModal();
    }
  };
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12">제목 : {text?.TextTitle}</div>
      <div className="col-start-1 col-span-3">
        작성자 :{" "}
        {text?.ID ? (text.ID === "adminim" ? "관리자" : text.ID) : text?.FakeID}
      </div>
      <div className="col-span-3 col-start-6">
        작성일 :{text ? new Date(text.Date).toISOString().split("T")[0] : ""}
      </div>
      <div className="col-span-12 h-[50vh]">{text?.TextBody}</div>
      <button
        className="h-8 w-16 bg-yellow-500 rounded-lg text-white m-1 col-end-8 col-span-1 "
        onClick={() => {
          router.push(`/Board/Edit/${params.slug}`);
        }}
      >
        수정
      </button>

      <PopupInputModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        message="비밀번호를 입력하세요."
      />
      <PopupBooleanModal
        isOpen={isModalOpen2}
        onClose={handleModalClose2}
        message="삭제하시겠습니까?"
      />
      <button
        className="h-8 w-16 bg-red-500 rounded-lg text-white m-1 col-end-10 col-span-1 "
        onClick={() => deleteLogic()}
      >
        삭제
      </button>
      <PopupModal
        isOpen={isTModalOpen}
        closeModal={closeTModal}
        message="권한이 없습니다."
      />
      <button
        className="h-8 w-16 bg-green-500 rounded-lg text-white m-1 col-end-12 col-span-1 "
        onClick={() => {
          router.push(`/Board`);
        }}
      >
        뒤로가기
      </button>
    </div>
  );
}
