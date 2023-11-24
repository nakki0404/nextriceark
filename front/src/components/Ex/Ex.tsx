// 부모 컴포넌트
"use client";
import React, { useState, useEffect } from "react";
import PopupBooleanModal from "@/components/common/PopupBooleanModal";
export default function Ex() {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleModalClose = async (confirmed: string) => {
    setModalOpen(false);
    const result = await new Promise((resolve) => {
      const data = confirmed;
      resolve(data);
    });
    if (result == true) {
      console.log(1);
    } else {
      console.log(2);
    }
  };
  return (
    <div>
      <button onClick={handleOpenModal}>asgdsasgdsgadgad</button>
      <PopupBooleanModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        message="정말 삭제요?"
      />
    </div>
  );
}
