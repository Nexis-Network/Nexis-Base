'use client';

import { atom, useAtom } from 'jotai';
import { LAYOUT_OPTIONS } from '@/lib/constants';

// 1. set initial atom for criptic layout
const cripticLayoutAtom = atom<string | null>(
  typeof window !== 'undefined'
    ? localStorage.getItem('criptic-layout')
    : LAYOUT_OPTIONS.MODERN
);

const cripticLayoutAtomWithPersistence = atom(
  (get) => get(cripticLayoutAtom),
  (get, set, newStorage: string | null) => {
    set(cripticLayoutAtom, newStorage);
    if (newStorage !== null) {
      localStorage.setItem('criptic-layout', newStorage);
    } else {
      localStorage.removeItem('criptic-layout');
    }
  }
);

// 2. useLayout hook to check which layout is available
export function useLayout() {
  const [layout, setLayout] = useAtom(cripticLayoutAtomWithPersistence);
  return {
    layout: layout === null ? LAYOUT_OPTIONS.MODERN : layout,
    setLayout,
  };
}
