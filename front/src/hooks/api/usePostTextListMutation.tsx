import { useMutation, useQueryClient } from "@tanstack/react-query";
import postTextList from "@/api/postTextList";

export const usePostTextListMutation = () => {
  const queryClient = useQueryClient();
  const postMutation = useMutation({
    mutationFn: postTextList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["textList"] });
    },
    onError: (error) => {
      if (error) return;
    },
  });
  return postMutation;
};
