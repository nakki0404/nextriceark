import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateTextList from "@/api/updateTextList";

export const useUpdateTextListMutation = () => {
  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: updateTextList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["textList"] });
    },
    onError: (error) => {
      if (error) return;
    },
  });
  return updateMutation;
};
