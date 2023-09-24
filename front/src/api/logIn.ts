//logIn.ts
// "use client";
import { accountLogin } from "@/store/slices/login-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

export default function logIn(
  ID: string,
  Password: string,
  setID: Function,
  setPassword: Function
) {
  const dispatch = useDispatch<AppDispatch>();
  // 로그인 정보
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
      dispatch(accountLogin(true));
      setID("");
      setPassword("");
    })
    .catch((error) => {
      console.error("Error updating data:", error);
    });
}
