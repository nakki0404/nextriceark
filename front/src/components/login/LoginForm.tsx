//LoginForm.tsx
"use client";
import { useState, ChangeEvent } from "react";
// import logIn from "@/api/logIn";
import { setLogin } from "@/store/slices/isLogin";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import Link from "next/link";

export default function LoginForm() {
  const [ID, setID] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const handleIDChange = (e: ChangeEvent<HTMLInputElement>) => {
    setID(e.target.value); // 입력된 값을 title 상태에 저장
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value); // 입력된 값을 title 상태에 저장
  };
  const dispatch = useDispatch<AppDispatch>();
  // 로그인 정보
  const logIn = () => {
    const loginData = {
      ID: ID,
      Password: Password,
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/Login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // 로그인 성공 시 서버에서 토큰을 받아온다고 가정
        return response.json();
      })
      .then((data) => {
        const token = data.token; // 이 부분은 실제 토큰이 어떻게 제공되는지에 따라 다를 수 있습니다.
        // 토큰을 저장하고 사용하는 로직 추가
        localStorage.setItem("token", token);
        // loginState({ isLogin: true });
        dispatch(setLogin(true));

        setID("");
        setPassword("");
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  return (
    <div className=" box-border h-1/2 w-1/2 p-4 border-8">
      <div className="text-xl">쌀로아 로그인</div>
      <div className="px-4 py-2">아이디</div>
      <input
        className="w-11/12 h-12 px-4 py-2"
        type="text"
        placeholder="ID"
        onChange={handleIDChange}
        value={ID}
      ></input>
      <div>비밀번호</div>
      <input
        className="w-11/12 h-12 px-4 py-2"
        type="password"
        placeholder="password"
        onChange={handlePasswordChange}
        value={Password}
      ></input>
      <div className="flex flex-row justify-around ">
        <button className="px-4 py-2" onClick={logIn}>
          로그인
        </button>

        <Link href="/Signup">
          <button className="px-4 py-2">회원가입</button>
        </Link>
      </div>
      아무기능도없으니 가입하지마시오
    </div>
  );
}
