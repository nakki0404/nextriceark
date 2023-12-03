import axios from "axios";
const updateTextList = async (updateText: any) => {
  try {
    const { data } = await axios.patch(
      `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/Board`,
      updateText
    );
    return data;
  } catch (error: any) {
    console.error("오류 발생:", error.message);
    throw error;
  }
};
export default updateTextList;
