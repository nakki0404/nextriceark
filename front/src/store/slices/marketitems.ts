import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 유저 상태를 정의할 타입을 만든다.
type marketitems = {
  _id: string;
  Id: number;
  Name: string;
  Grade: string;
  Icon: string;
  BundleCount: number;
  TradeRemainCount: number | null;
  YDayAvgPrice: number;
  RecentPrice: number;
  CurrentMinPrice: number;
  __v: number;
};

// 초기 상태를 정의
const initialState: marketitems[] = [];

// createSlice 함수를 사용하여 슬라이스 생성
export const marketitems = createSlice({
  name: "marketitems", // 슬라이스 이름
  initialState, // 초기 상태
  reducers: {
    // 아이템 추가 액션
    addmarketitems: (state, action: PayloadAction<marketitems>) => {
      // 새로운 아이템을 배열에 추가하는 로직
      state.push(action.payload);
    },
    // 다른 아이템 관련 액션들을 여기에 추가할 수 있습니다.
  },
});

// 액션 크리에이터 함수를 내보냅니다.
export const { addmarketitems } = marketitems.actions;

// 리듀서를 내보냅니다.
export default marketitems.reducer;
