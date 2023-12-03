import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteTextList from "@/api/deleteTextList";

export const useDeleteTextListMutation = () => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteTextList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["textList"] });
    },
    onError: (error) => {
      if (error) return;
    },
  });
  return deleteMutation;
};
