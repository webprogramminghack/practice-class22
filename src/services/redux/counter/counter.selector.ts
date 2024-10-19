import { RootState } from '..';

export const counterSelector = (state: RootState) => state.counter.value;
