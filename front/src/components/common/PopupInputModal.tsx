// Modal.js
"use client";
import React, { FC, useState } from "react";
interface PopupBooleanModalProps {
  isOpen: boolean;
  onClose: (confirmed: boolean, confirmedInput?: string) => void;
  message: string;
}
const PopupModalEx: FC<PopupBooleanModalProps> = ({
  isOpen,
  onClose,
  message,
}) => {
  const handleConfirmation = (confirmed: boolean, confirmedInput?: string) => {
    onClose(confirmed, confirmedInput);
    setPassword("");
  };

  const [password, setPassword] = useState("");
  const changePassword = (e: any) => {
    setPassword(e.target.value);
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div className="bg-white p-8 rounded-lg shadow-lg z-50">
        <p>{message}</p>
        <input
          className="border-2"
          type="password"
          onChange={changePassword}
          value={password}
        ></input>
        <div className="flex flex-row justify-around">
          <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
            onClick={() => handleConfirmation(true, password)}
          >
            확인
          </button>
          <button
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg"
            onClick={() => handleConfirmation(false)}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};
export default PopupModalEx;
//
// 부모 컴포넌트
// "use client";
// import React, { useState, useEffect } from "react";
// import PopupBooleanModal from "@/components/common/PopupBooleanModal";
// export default function Ex() {
//   const [isModalOpen, setModalOpen] = useState(false);
//   const handleOpenModal = () => {
//     setModalOpen(true);
//   };
//   const handleModalClose = async (confirmed: string) => {
//     setModalOpen(false);
//     const result = await new Promise((resolve) => {
//       const data = confirmed;
//       resolve(data);
//     });
//     if (result == true) {
//       console.log(1);
//     } else {
//       console.log(2);
//     }
//   };
//   return (
//     <div>
//       <button onClick={handleOpenModal}>asgdsasgdsgadgad</button>
//       <PopupBooleanModal
//         isOpen={isModalOpen}
//         onClose={handleModalClose}
//         message="정말 삭제요?"
//       />
//     </div>
//   );
// }
