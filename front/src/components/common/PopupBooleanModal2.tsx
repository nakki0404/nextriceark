// Modal.js

import React, { FC } from "react";
interface PopupBooleanModalProps {
  isOpen: boolean;
  onClose: (confirmed: boolean) => void;
  message: string;
}

const PopupBooleanModal: FC<PopupBooleanModalProps> = ({
  isOpen,
  onClose,
  message,
}) => {
  if (!isOpen) return null;

  const handleConfirmation = (confirmed: boolean) => {
    onClose(confirmed);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div className="bg-white p-8 rounded-lg shadow-lg z-50">
        <span
          className="absolute top-4 right-4 text-gray-700 cursor-pointer"
          onClick={() => handleConfirmation(false)}
        >
          &times;
        </span>
        <p>{message}</p>
        <div className="flex flex-row justify-around">
          <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
            onClick={() => handleConfirmation(true)}
          >
            네
          </button>
          <button
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg"
            onClick={() => handleConfirmation(false)}
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupBooleanModal;
