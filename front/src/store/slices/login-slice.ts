import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 유저 상태를 정의할 타입을 만든다.
type LoginState = boolean;

// 초기 상태를 정의
const initialState: LoginState = false;

// createSlice 함수를 사용하여 슬라이스 생성
export const login = createSlice({
  name: "login", // 슬라이스 이름
  initialState, // 초기 상태
  reducers: {
    // 아이템 추가 액션
    accountLogin: (state, action: PayloadAction<LoginState>) => {
      // 새로운 아이템을 배열에 추가하는 로직
      return action.payload;
    },
    // 다른 아이템 관련 액션들을 여기에 추가할 수 있습니다.
  },
});

// 액션 크리에이터 함수를 내보냅니다.
export const { accountLogin } = login.actions;

// 리듀서를 내보냅니다.
export default login.reducer;
