import { CancerPresence } from '@/stores/cancer/cancer-store';
import React from 'react'
import { useFocus } from '@/lib/hooks/use-focus';

export default function useCheckChange(setN: (key: any, value: any) => void) {
  const { scrollToFocus } = useFocus()
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setN(
      e.target.value,
      e.target.checked ? CancerPresence.유 : CancerPresence.무,
    );
  }

  function handleHasChange(scrollId: string, e: React.ChangeEvent<HTMLInputElement>): void {
    const presence = e.target.checked ? CancerPresence.무 : CancerPresence.유;
    setN(
      e.target.value,
      presence,
    );
    if (presence === CancerPresence.무) {
      scrollToFocus(scrollId);
    }
  }

  return {
    handleChange,
    handleHasChange,
  }
}
