//LoginForm.tsx
"use client";
import { useState, ChangeEvent, useEffect } from "react";
// import logIn from "@/api/logIn";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  // 로그인 정보
  const handleSignup = (form: string) => {
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
    if (ID !== "" && Password !== "" && form !== "") {
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
        })
        .catch((error) => {
          console.error("Error updating data:", error.message);
        });
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
    <div className=" box-border h-1/2 w-1/2 p-4 border-8">
      <div className="text-xl">쌀로아 회원가입</div>
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
      <div>비밀번호 재확인</div>
      <input
        className="w-11/12 h-12 px-4 py-2"
        type="password"
        placeholder="password"
        onChange={handlePassword2Change}
        value={Password2}
      ></input>
      <div>비밀번호 찾기 질문</div>
      <input
        className="w-11/12 h-12 px-4 py-2"
        type="text"
        placeholder="Question"
        onChange={handleQuestionChange}
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
      <input
        type="string"
        placeholder={`${pass}` + "자동입력방지"}
        onChange={(e) => fillForm(e.target.value)}
        value={form}
      />

      <div className="flex flex-row justify-around ">
        <button className="px-4 py-2" onClick={() => handleSignup(form)}>
          가입신청
        </button>

        <Link href="/Login">
          <button className="px-4 py-2">뒤로가기</button>
        </Link>
      </div>
    </div>
  );
}
