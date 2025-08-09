import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiClient } from '../../api/api';
import {
	Status,
	type FetchPizzasParams,
	type GetItemsSliceInitialState,
} from './types';

export const fetchPizzas = createAsyncThunk(
	'items/fetchPizzasStatus',
	async (params: FetchPizzasParams) => {
		const { category, sortBy, order, search, perPage, currentPage } = params;

		const url = `/pizzas?${category}&q=${search}&_sort=${sortBy}&_order=${order}&_page=${currentPage}&_limit=${perPage}`;
		const { data, headers } = await apiClient.get(url);

		const headersCount = headers['x-total-count'];
		return { data, headersCount };
	}
);

export const fetchAllPizzas = createAsyncThunk(
	'items/fetchAllPizzasStatus',
	async () => {
		const url = '/pizzas';
		const res = await apiClient.get(url);

		return res.data;
	}
);

const initialState: GetItemsSliceInitialState = {
	pizzas: [],
	allPizzas: [],
	itemsCount: 0,
	status: Status.LOADING,
	statusAll: Status.LOADING,
};

export const getItemsSlice = createSlice({
	name: 'items',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchPizzas.pending, state => {
			state.status = Status.LOADING;
			state.pizzas = [];
		});
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.status = Status.SUCCESS;
			state.pizzas = action.payload.data;
			state.itemsCount = action.payload.headersCount;
		});
		builder.addCase(fetchPizzas.rejected, state => {
			state.status = Status.ERROR;
			state.pizzas = [];
		});
		builder.addCase(fetchAllPizzas.pending, state => {
			state.statusAll = Status.LOADING;
			state.allPizzas = [];
		});
		builder.addCase(fetchAllPizzas.fulfilled, (state, action) => {
			state.statusAll = Status.SUCCESS;
			state.allPizzas = action.payload;
		});
		builder.addCase(fetchAllPizzas.rejected, state => {
			state.statusAll = Status.ERROR;
			state.allPizzas = [];
		});
	},
});

export default getItemsSlice.reducer;
