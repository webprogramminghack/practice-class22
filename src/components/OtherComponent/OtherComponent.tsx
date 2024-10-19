import { useCounterContext } from '@/hooks/counter/useCounterContext';
import React from 'react';
import { Button } from '../Button';

export const OtherComponent: React.FC = () => {
  const { increment } = useCounterContext();

  console.log('OtherComponent rendered');

  return (
    <div>
      <Button onClick={increment}>Increment</Button>
    </div>
  );
};
