'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

import { Toaster } from 'react-hot-toast';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef(store);
  return (
    <Provider store={storeRef.current}>
      <Toaster position="top-right" reverseOrder={false} />
      {children}
    </Provider>
  );
}
