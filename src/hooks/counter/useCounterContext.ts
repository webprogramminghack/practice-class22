import { CounterContext } from '@/context/CounterContext';
import { useContext } from 'react';

export const useCounterContext = () => {
  const context = useContext(CounterContext);

  if (!context) {
    throw new Error('useCounterContext must be used within a CounterProvider');
  }

  return context;
};
