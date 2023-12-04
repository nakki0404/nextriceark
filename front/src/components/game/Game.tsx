"use client";
import React, { useState, useRef, useEffect } from "react";
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
export default function Game() {
  const canvasRef = useRef(null);

  const [position, setPosition] = useState({ x: 250, y: 250 });
  const [targetPosition, setTargetPosition] = useState({ x: 250, y: 250 });
  const [isRightClicking, setIsRightClicking] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [redSquarePosition, setRedSquarePosition] = useState({
    x: 100,
    y: 100,
  });
  // function areRectanglesColliding(rect1, rect2) {
  //   let Colliding =
  //     rect1.x < rect2.x + rect2.width &&
  //     rect1.x + rect1.width > rect2.x &&
  //     rect1.y < rect2.y + rect2.height &&
  //     rect1.y + rect1.height > rect2.y;
  //   if (Colliding === true) {
  //     return console.log("사망");
  //   }
  //   return console.log("생존");
  // }
  // const object1 = { x: position.x, y: position.y, width: 10, height: 10 };
  // const object2 = {
  //   x: redSquarePosition.x,
  //   y: redSquarePosition.y,
  //   width: 20,
  //   height: 20,
  // };
  // setInterval(() => areRectanglesColliding(object1, object2), 5000);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let isMoving = false;
    const handleCanvasMouseMove = (e) => {
      if (!isMoving) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        setTargetPosition({ x: mouseX - 10, y: mouseY - 10 }); // 25는 사각형의 크기의 반값
      }
    };
    const animateMove = () => {
      const easingFactor = 0.2; // 부드러운 이동을 위한 이징 팩터
      const dx = targetPosition.x - position.x;
      const dy = targetPosition.y - position.y;
      position.x += dx * easingFactor;
      position.y += dy * easingFactor;
      context.clearRect(0, 0, canvas.width, canvas.height); // 이전 프레임 지우기
      context.fillStyle = isRightClicking ? "red" : "green";
      context.fillRect(position.x, position.y, 10, 10);
      context.fillStyle = "red";
      context.fillRect(redSquarePosition.x, redSquarePosition.y, 20, 20);
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        requestAnimationFrame(animateMove);
      } else {
        isMoving = false;
      }
    };
    animateMove(); // 우클릭 및 마우스 누르고 있는 동안 이동 애니메이션 시작
    canvas.addEventListener("mousemove", handleCanvasMouseMove);
    return () => {
      canvas.removeEventListener("mousemove", handleCanvasMouseMove);
    };
  }, [position, targetPosition, isRightClicking]);
  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={500}
      style={{ border: "1px solid #000" }}
    />
  );
}
