import axios from "axios";
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");

export const getVisitorCountCookie = async () => {
  try {
    if (!PHASE_DEVELOPMENT_SERVER) {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/VisitorCount`,
        { withCredentials: true }
      );
      return data;
    }
    return { Total: 1, Today: 1 };
  } catch (error: any) {
    console.error("오류 발생:", error.message);
    throw error;
  }
};
