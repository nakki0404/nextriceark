// 부모 컴포넌트
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ekiImage from "@/asset/png/eki.png";
export default function FindEki() {
  const [duration, setDuration] = useState(3000);
  const [translateY, setTranslateY] = useState(0);
  const [stage, setStage] = useState(7);
  const [message, setMessage] = useState("");
  const [timeoutId, setTimeoutId]: any = useState("");
  const randomNumber = Math.floor(Math.random() * stage);
  const classNames = `flex flex-row duration-[${duration}ms] translate-y-${translateY}`;
  const start = () => {
    setTranslateY(96);
    setDuration(3000);
    let timeoutIdNumber = setTimeout(selectFalse, 3000);
    setTimeoutId(timeoutIdNumber);
  };
  const selectTrue = () => {
    clearTimeout(timeoutId);
    setTranslateY(0);
    setDuration(0);
    setMessage(`${stage - 6}단계 성공`);
    setStage(stage + 1);
  };
  const selectFalse = () => {
    clearTimeout(timeoutId);
    setTranslateY(0);
    setDuration(0);
    setMessage(`${stage - 6}단계 실패`);
    setStage(7);
  };
  const reset = () => {
    setTranslateY(0);
    setDuration(0);
    setMessage("화이팅");
    setStage(7);
  };
  useEffect(() => {
    const classNames = `flex flex-row duration-[${duration}ms] translate-y-${translateY}`;
  }, [translateY]);

  //차이점
  //로컬 새로고침하면 반대 그림이 변한다.
  //정상적인 접근? 네비 바를 통해서 이동.
  //주소입력으로 접근해도 버그가 발생함.
  //렌더링 문제고.
  //csr ssr 둘중 하나일텐데.
  //근데 또, 렌더링 문제라하면,
  //위에서 말한 정상적으로 이용하기 위한 접근 방식에선
  //왜 발생하지 않는가
  return (
    <div>
      <div>진짜에키드나 찾기</div>
      <div className="flex flex-row">
        <button
          className="h-8 w-16 bg-green-500 rounded-lg text-white m-1"
          onClick={() => start()}
        >
          start
        </button>
        <button
          className="h-8 w-16 bg-red-500 rounded-lg text-white m-1"
          onClick={() => reset()}
        >
          reset
        </button>
      </div>
      <div>설명 : 시작을 누른다. 찾는다. 제한시간은 3초 </div>
      <div>{message}</div>
      {/* <div>{translateY}</div>
      <div>{duration}</div>
      <div>{classNames}</div> */}
      {/* <div className="flex flex-row duration-[3000ms] translate-y-96"> */}
      <div className={classNames}>
        {Array.from({ length: stage }, (_, index) => (
          <React.Fragment key={index}>
            {index === randomNumber ? (
              <Image
                src={ekiImage}
                alt={`ekiImage_${index}`}
                title={`ekiImage_${index}`}
                style={{ transform: "scaleX(-1)" }}
                onClick={() => selectTrue()}
              />
            ) : (
              <Image
                src={ekiImage}
                alt={`ekiImage_${index}`}
                title={`ekiImage_${index}`}
                onClick={() => selectFalse()}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
