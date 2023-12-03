import { useEffect, useState } from "react";
import { useTextListQuery } from "@/hooks/api/useTextListQuery";
import type { Text } from "@/types/Text";

export function useTextList() {
  const { TextList } = useTextListQuery();

  const [textList, setTextList] = useState<Text[]>([]);
  useEffect(() => {
    if (TextList) {
      setTextList(TextList);
    }
  }, [TextList]);

  return { textList };
}
