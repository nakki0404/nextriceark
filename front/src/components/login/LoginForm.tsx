//LoginForm.tsx
"use client";
import { useState, ChangeEvent } from "react";
// import logIn from "@/api/logIn";
import { setloginstate } from "@/store/slices/loginstate";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PopupModal from "@/components/common/PopupModal";

export default function LoginForm() {
  const router = useRouter();
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

  const [isTModalOpen, setTModalOpen] = useState(false);
  const openTModal = () => {
    setTModalOpen(true);
  };

  const closeTModal = () => {
    setTModalOpen(false);
  };
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const logIn = () => {
    const loginData = {
      ID: ID,
      Password: Password,
    };
    if (ID && Password) {
      fetch(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/Login`, {
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
          dispatch(setloginstate({ isLogin: true, ID: loginData.ID }));
          localStorage.setItem(
            "localStorageKey5",
            JSON.stringify({
              isLogin: true,
              ID: loginData.ID,
            })
          );
          setID("");
          setPassword("");
          router.back();
          openTModal();
        })
        .catch((error) => {
          console.error("Error updating data:", error);
          openModal();
        });
    } else {
      openModal();
    }
  };

  return (
    <div className=" ">
      <div className="text-xl">쌀로아 로그인</div>
      <div className="px-4 py-2">아이디</div>
      <input
        className="w-11/12 h-12 px-4 py-2 rounded-lg m-1"
        type="text"
        placeholder="ID"
        onChange={handleIDChange}
        value={ID}
      ></input>
      <div>비밀번호</div>
      <input
        className="w-11/12 h-12 px-4 py-2 rounded-lg m-1"
        type="password"
        placeholder="password"
        onChange={handlePasswordChange}
        value={Password}
      ></input>
      <div className="flex flex-row justify-around ">
        <button
          className="h-12 w-24 bg-blue-500 rounded-lg text-white m-1"
          onClick={logIn}
        >
          로그인
        </button>

        <PopupModal
          isOpen={isTModalOpen}
          closeModal={closeTModal}
          message="로그인 성공!!!"
        />

        <PopupModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          message="로그인 실패, 아이디와 비밀번호를 확인해주세요"
        />
        <Link href="/Login/Signup">
          <button className="h-12 w-24 bg-green-500 rounded-lg text-white m-1">
            회원가입
          </button>
        </Link>
      </div>
      <Link href="/Login/Forget" className="flex justify-center">
        <button className="h-12 w-48 bg-yellow-500 rounded-lg text-white m-1">
          비밀번호를 잊으셨나요?
        </button>
      </Link>
    </div>
  );
}
