import { useCounterContext } from '@/hooks/counter/useCounterContext';
import React from 'react';

export const OtherComponent2: React.FC = () => {
  const { count } = useCounterContext();

  console.log('OtherComponent2 rendered');
  return <div>Count: {count}</div>;
};
