'use client';

import { Provider } from 'react-redux';
import { store } from './libs/state/store';
import { MuiProvider } from './ui/components/MuiProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <MuiProvider>{children}</MuiProvider>
    </Provider>
  );
}
