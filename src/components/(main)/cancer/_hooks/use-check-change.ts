import { CancerPresence } from '@/stores/cancer/cancer-store';
import React from 'react'

export default function useCheckChange(setN: (key: any, value: any) => void) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setN(
      e.target.value,
      e.target.checked ? CancerPresence.유 : CancerPresence.무,
    );
  }

  function handleHasChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setN(
      e.target.value,
      e.target.checked ? CancerPresence.무 : CancerPresence.유,
    );
  }

  return {
    handleChange,
    handleHasChange,
  }
}
