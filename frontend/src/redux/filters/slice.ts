import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
	CategoriesListItem,
	FiltersSliceInitialState,
	SizePriceItem,
	SortListItem,
	TypeNameItem,
} from './types';

export const categoriesList: CategoriesListItem[] = [
	'Все',
	'Мясные',
	'Вегетарианская',
	'Гриль',
	'Острые',
	'Закрытые',
];
export const sortList: SortListItem[] = [
	{ name: 'Популярности', sortType: 'rating' },
	{ name: 'Цена (возростание)', sortType: 'price' },
	{ name: 'Цена (уменьшение)', sortType: '-price' },
	{ name: 'Алфавиту', sortType: 'title' },
];
export const typeName: TypeNameItem[] = ['Тонкое', 'Традиционное'];
export const sizePrice: SizePriceItem[] = [
	{ size: 26, plus: 0 },
	{ size: 30, plus: 100 },
	{ size: 40, plus: 200 },
];

const initialState: FiltersSliceInitialState = {
	activeCategory: 0,
	sortModalValue: {
		name: 'Популярности',
		sortType: 'rating',
	},
	currentPage: 1,
	searchValue: '',
	searchValueLocal: '',
	activeSize: 0,
	activePlusPrice: 0,
	activeType: [],
};

export const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setActiveCategory(state, action: PayloadAction<number>) {
			state.activeCategory = action.payload;
		},
		setSortModalValue(state, action: PayloadAction<SortListItem>) {
			state.sortModalValue = action.payload;
		},
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload;
		},
		setSearchValueLocal(state, action: PayloadAction<string>) {
			state.searchValueLocal = action.payload;
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		},
		setFiltersUrl(state, action: PayloadAction<FiltersSliceInitialState>) {
			state.currentPage = Number(action.payload.currentPage);
			state.activeCategory = Number(action.payload.activeCategory);
			state.sortModalValue = action.payload.sortModalValue;
		},
	},
});

export const {
	setActiveCategory,
	setSortModalValue,
	setSearchValue,
	setSearchValueLocal,
	setCurrentPage,
	setFiltersUrl,
} = filtersSlice.actions;

export default filtersSlice.reducer;
