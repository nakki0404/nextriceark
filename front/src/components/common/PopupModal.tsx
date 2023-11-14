// Modal.js

import React, { FC } from "react";
interface PopupModalProps {
  isOpen: boolean;
  closeModal: () => void;
  message: string;
}

const PopupModal: FC<PopupModalProps> = ({ isOpen, closeModal, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div className="bg-white p-8 rounded shadow-lg z-50">
        <span
          className="absolute top-4 right-4 text-gray-700 cursor-pointer"
          onClick={closeModal}
        >
          &times;
        </span>
        <p>{message}</p>
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          onClick={closeModal}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default PopupModal;
