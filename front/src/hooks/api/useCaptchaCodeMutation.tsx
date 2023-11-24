import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCaptchaCode } from "@/api/deleteCaptchaCode";

export const useCaptchaCodeMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteCaptchaCode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["captchaCode"] });
    },
    onError: (error) => {
      if (error) return;
    },
  });
  return mutation;
};
