import { getLockPw } from "@/services/settings/get_lock_pw";
import { saveLockPw } from "@/services/settings/save_lock_pw";
import { paths } from "@/paths";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useLockpw = () => {
  const key = paths.settings("lockpw");
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: [key],
    queryFn: getLockPw,
    gcTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 5,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: [key],
    mutationFn: saveLockPw,
    onSuccess: () => {
      reloadLockpw();
      toast.success("잠금 비밀번호가 변경되었습니다.");
    },
  });

  const reloadLockpw = () => {
    queryClient.invalidateQueries({ queryKey: [key] });
  };

  return {
    isLoading: isLoading || isPending,
    lockPw: data?.lockPw,
    mutate,
    reloadLockpw,
  };
};
