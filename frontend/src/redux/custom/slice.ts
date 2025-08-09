import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CustomSliceInitialState } from './types';

const initialState: CustomSliceInitialState = {
	stickyValue: false,
};

export const customSlice = createSlice({
	name: 'custom',
	initialState,
	reducers: {
		setStickyValue(state, action: PayloadAction<boolean>) {
			state.stickyValue = action.payload;
		},
	},
});

export const { setStickyValue } = customSlice.actions;

export default customSlice.reducer;
