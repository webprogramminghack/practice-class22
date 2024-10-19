import { createSlice } from '@reduxjs/toolkit';

type CounterState = {
  value: 0;
};

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // you can mutate the state directly because of immer
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const {
  actions: { increment, decrement },
} = counterSlice;
