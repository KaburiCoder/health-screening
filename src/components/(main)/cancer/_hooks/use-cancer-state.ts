import { CancerMensturation, useCancerStore } from '@/stores/cancer/cancer-store';
import React from 'react'

export const useCancerState = () => {
  const n9 = useCancerStore((state) => state.n9);
  const n10 = useCancerStore((state) => state.n10);
  const n12 = useCancerStore((state) => state.n12);
  /** 초경이 있었다 */
  const hadMenarche = n9?.has === CancerMensturation.n세;
  /** 페경 됨 */
  const wasMenopause = n10?.state === "3";
  /** 출산 해봤음 */
  const givenBirth = n12 === "1" || n12 === "2";

  return {
    hadMenarche,
    wasMenopause,
    givenBirth,
  }
}

