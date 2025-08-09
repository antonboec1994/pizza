export const Status = {
	LOADING: 'loading',
	SUCCESS: 'success',
	ERROR: 'error',
} as const;

export type Status = (typeof Status)[keyof typeof Status];

export type FetchPizzasParams = {
	category: string;
	sortBy: string;
	order: string;
	search: string;
	perPage: number;
	currentPage: number;
};

export type PizzaItem = {
	id: string;
	title: string;
	price: number;
	types: number[];
	sizes: number[];
	imageUrl: string;
	description: string;
	count: number;
	activePlusPrice: number;
};

export interface GetItemsSliceInitialState {
	pizzas: PizzaItem[];
	allPizzas: PizzaItem[];
	itemsCount: number;
	status: Status;
	statusAll: Status;
}
