import { useEffect, useState } from "react";
import { useTextListQuery } from "@/hooks/api/useTextListQuery";

export function useTextList() {
  const { TextList } = useTextListQuery();

  const [textList, setTextList] = useState([]);
  useEffect(() => {
    if (TextList) {
      setTextList(TextList);
    }
  }, [TextList]);

  return { textList };
}
