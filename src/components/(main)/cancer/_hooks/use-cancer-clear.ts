'use client'
import { useConditionStore } from "@/stores/condition-store";
import { useErrorStore } from "@/stores/error-store";
import { useCancerStore } from "@/stores/cancer/cancer-store";

export const useCancerClear = () => {
  const clearCancer = useCancerStore(state => state.clear)
  const clearError = useErrorStore((state) => state.clearError);
  const clear = useConditionStore(state => state.clear)

  function clearAll() {
    clearCancer();
    clear();
    clearError();
  }

  return { clearAll }
}