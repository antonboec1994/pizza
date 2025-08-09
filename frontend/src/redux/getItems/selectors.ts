import type { RootState } from '../store';

export const getItemsSelector = (state: RootState) => state.items;
