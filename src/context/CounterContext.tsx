import React, { createContext, useState } from 'react';

type CounterContextType = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

export const CounterContext = createContext<CounterContextType | null>(null);

type CounterProviderProps = {
  children: React.ReactNode;
};

export const CounterProvider: React.FC<CounterProviderProps> = ({
  children,
}) => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prevCount) => prevCount + 1);
  const decrement = () => setCount((prevCount) => prevCount - 1);

  return (
    <CounterContext.Provider value={{ count, increment, decrement }}>
      {children}
    </CounterContext.Provider>
  );
};
