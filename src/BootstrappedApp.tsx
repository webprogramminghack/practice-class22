import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import App from './App';
import { DialogProvider } from './context/DialogContext';
import { CounterProvider } from './context/CounterContext';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './services/redux';

const queryClient = new QueryClient();

export const BootstrappedApp: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <DialogProvider>
          <CounterProvider>
            <App />
          </CounterProvider>
        </DialogProvider>
      </ReduxProvider>
    </QueryClientProvider>
  );
};
