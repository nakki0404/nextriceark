//LoginForm.tsx
"use client";
import { useState, ChangeEvent, useEffect } from "react";
// import logIn from "@/api/logIn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PopupModal from "@/components/common/PopupModal";

export default function SignupForm() {
  const router = useRouter();
  const [ID, setID] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const [Password2, setPassword2] = useState<string>("");
  const [Question, setQuestion] = useState<string>("");
  const [Anwser, setAnwser] = useState<string>("");
  const handleIDChange = (e: ChangeEvent<HTMLInputElement>) => {
    setID(e.target.value); // 입력된 값을 title 상태에 저장
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value); // 입력된 값을 title 상태에 저장
  };
  const handlePassword2Change = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword2(e.target.value); // 입력된 값을 title 상태에 저장
  };
  const handleQuestionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value); // 입력된 값을 title 상태에 저장
  };
  const handleAnwserChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAnwser(e.target.value); // 입력된 값을 title 상태에 저장
  };

  const [isIDTModalOpen, setIDTModalOpen] = useState(false);
  const openIDTModal = () => {
    setIDTModalOpen(true);
  };

  const closeIDTModal = () => {
    setIDTModalOpen(false);
  };
  const [isIDFModalOpen, setIDFModalOpen] = useState(false);
  const openIDFModal = () => {
    setIDFModalOpen(true);
  };

  const closeIDFModal = () => {
    setIDFModalOpen(false);
  };
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

  const handleIDCheck = () => {
    const requestBody = {
      Item: {
        ID: ID,
      },
    };
    if (ID.length > 0) {
      fetch(process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL + "/check", {
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
          if (data === true) {
            openIDFModal();
          } else {
            openIDTModal();
          }
          console.log(data);
        })
        .catch((error) => {
          console.error("Error updating data:", error.message);
        });
    }
  };

  // 로그인 정보
  const handleSignup = () => {
    const requestBody = {
      Item: {
        ID: ID,
        Password: Password,
        Role: "",
        Question: Question,
        Anwser: Anwser,
      },
      Pass: form,
    };
    if (
      ID.length > 0 &&
      Password.length > 0 &&
      form.length > 0 &&
      Question.length > 0 &&
      Anwser.length > 0
    ) {
      fetch(process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL + "/signup", {
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
          console.log("Data updated successfully:", data);
          setID("");
          setPassword("");
          router.push("/Login");
          openTModal();
        })
        .catch((error) => {
          console.error("Error updating data:", error.message);
          openModal();
        });
    } else {
      openModal();
    }
  };
  const [pass, setPass] = useState<string>("");

  const touch = () => {
    fetch(process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL + "/touch")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPass(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    touch();
  }, []);

  const [form, setForm] = useState<string>("");

  const fillForm = (value: string) => {
    setForm(value);
  };

  return (
    <div className=" ">
      <div className="text-xl">쌀로아 회원가입</div>
      <div className="px-4 py-2">ID</div>
      <div className="flex flex-row">
        <input
          className="w-11/12 h-12 px-4 py-2 m-1 rounded-lg"
          type="text"
          placeholder="ID"
          onChange={handleIDChange}
          value={ID}
        ></input>
        <button
          onClick={(e) => handleIDCheck()}
          className=" h-12 w-24 bg-green-500 rounded-lg text-white m-1"
        >
          중복 검사
        </button>
      </div>
      <div>비밀번호</div>
      <input
        className="w-11/12 h-12 px-4 py-2 m-1 rounded-lg"
        type="password"
        placeholder="password"
        onChange={handlePasswordChange}
        value={Password}
      ></input>
      <div>비밀번호 재확인</div>
      <input
        className="w-11/12 h-12 px-4 py-2 m-1 rounded-lg"
        type="password"
        placeholder="password"
        onChange={handlePassword2Change}
        value={Password2}
      ></input>
      <div>비밀번호 찾기 질문</div>
      <input
        className="w-11/12 h-12 px-4 py-2  m-1 rounded-lg"
        type="text"
        placeholder="Question"
        onChange={handleQuestionChange}
        value={Question}
      ></input>
      <div>답변</div>
      <input
        className="w-11/12 h-12 px-4 py-2 m-1 rounded-lg"
        type="text"
        placeholder="Anwser"
        onChange={handleAnwserChange}
        value={Anwser}
      ></input>
      <input
        className="w-11/12 h-12 px-4 py-2 m-1  rounded-lg"
        type="string"
        placeholder={`${pass}` + "자동입력방지"}
        onChange={(e) => fillForm(e.target.value)}
        value={form}
      />

      <div className="flex flex-row justify-around ">
        <button
          className="h-12 w-24 bg-blue-500 rounded-lg text-white m-1"
          onClick={() => handleSignup()}
        >
          가입신청
        </button>
        <PopupModal
          isOpen={isTModalOpen}
          closeModal={closeTModal}
          message="가입 성공!!!"
        />
        <PopupModal
          isOpen={isIDFModalOpen}
          closeModal={closeIDFModal}
          message="이미 존재하는 ID 입니다."
        />
        <PopupModal
          isOpen={isIDTModalOpen}
          closeModal={closeIDTModal}
          message="사용가능한 ID입니다."
        />
        <PopupModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          message="가입 실패, 입력된 정보를 확인해주세요."
        />
        <Link href="/Login">
          <button className="h-12 w-24 bg-red-500 rounded-lg text-white m-1">
            뒤로가기
          </button>
        </Link>
      </div>
    </div>
  );
}
