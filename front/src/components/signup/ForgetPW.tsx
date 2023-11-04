//LoginForm.tsx
"use client";
import { useState, ChangeEvent, useEffect } from "react";
// import logIn from "@/api/logIn";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgetPW() {
  const router = useRouter();
  const [ID, setID] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const [Question, setQuestion] = useState<string>("");
  const [Anwser, setAnwser] = useState<string>("");
  const handleIDChange = (e: ChangeEvent<HTMLInputElement>) => {
    setID(e.target.value); // 입력된 값을 title 상태에 저장
  };
  const handleAnwserChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAnwser(e.target.value); // 입력된 값을 title 상태에 저장
  };
  // 로그인 정보
  const handleForget = () => {
    const requestBody = {
      Item: { ID: ID },
    };
    fetch(process.env.REACT_APP_BACKEND_URL + "/forget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error updating data: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setQuestion(data);
      })
      .catch((error) => {
        console.error("Error updating data:", error.message);
      });
  };
  const handleForget2 = () => {
    const requestBody = {
      Item: { ID: ID, Anwser: Anwser, Question: Question },
    };
    fetch(process.env.REACT_APP_BACKEND_URL + "/forget2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error updating data: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setPassword(data);
      })
      .catch((error) => {
        console.error("Error updating data:", error.message);
      });
  };

  return (
    <div className=" box-border h-1/2 w-1/2 p-4 border-8">
      <div className="text-xl">쌀로아 비밀번호 찾기</div>
      <div className="px-4 py-2">아이디</div>

      <input
        className="w-11/12 h-12 px-4 py-2"
        type="text"
        placeholder="ID"
        onChange={handleIDChange}
        value={ID}
      ></input>
      <button className="px-4 py-2" onClick={() => handleForget()}>
        확인
      </button>
      <div>비밀번호 찾기 질문</div>
      <input
        className="w-11/12 h-12 px-4 py-2"
        type="text"
        placeholder="Question"
        value={Question}
      ></input>
      <div>답변</div>
      <input
        className="w-11/12 h-12 px-4 py-2"
        type="text"
        placeholder="Anwser"
        onChange={handleAnwserChange}
        value={Anwser}
      ></input>

      <button className="px-4 py-2" onClick={() => handleForget2()}>
        확인
      </button>
      <input
        className="w-11/12 h-12 px-4 py-2"
        type="text"
        placeholder="Anwser"
        value={Password}
      ></input>
      <Link href="/Login">
        <button className="px-4 py-2">뒤로가기</button>
      </Link>
    </div>
  );
}
