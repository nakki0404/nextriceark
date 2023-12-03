import axios from "axios";
const postTextList = async (postText: any) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/Board`,
      postText
    );
    return data;
  } catch (error: any) {
    console.error("오류 발생:", error.message);
    throw error;
  }
};
export default postTextList;
