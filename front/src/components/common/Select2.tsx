// Modal.js
"use client";
import React, { FC, useState } from "react";

interface SelectProps {
  Array: string[];
  PlaceHolder: string;
  onchange: () => void;
}

const Select2: FC<SelectProps> = ({ Array, PlaceHolder, onchange }) => {
  const [selectedValue, setSelectedValue] = useState(PlaceHolder);
  const changeSelectedValue = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <select value={selectedValue} onChange={changeSelectedValue}>
      {Array.map((elem) => (
        <option key={elem} value={elem}>
          {elem}
        </option>
      ))}
    </select>
  );
};

export default Select2;
