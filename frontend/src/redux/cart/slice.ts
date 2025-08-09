import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { calcTotalCount } from '../../utils/calcTotalCount';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';
import type { CartItem, CartSliceInitialState } from './types';

const lsData = getCartFromLS();

const initialState: CartSliceInitialState = {
	totalPricePizzasInCart: lsData.totalPrice,
	totalCountPizzasInCart: lsData.totalCount,
	pizzasInCart: lsData.pizzasInCart,
	newPriceInCart: 0,
	currentAddedPizza: {} as CartItem,
	fluidCartStatus: false,
	orderModal: false,
	orderTel: '',
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addPizzaInCart(state, action: PayloadAction<CartItem>) {
			state.currentAddedPizza = action.payload;
			const findItem = state.pizzasInCart.find(obj => {
				return (
					obj.id === action.payload.id &&
					obj.type === action.payload.type &&
					obj.size === action.payload.size
				);
			});
			if (findItem) {
				findItem.count++;
			} else {
				state.pizzasInCart.push({
					...action.payload,
					count: 1,
				});
			}
			state.totalPricePizzasInCart = calcTotalPrice(state.pizzasInCart);
			state.totalCountPizzasInCart = calcTotalCount(state.pizzasInCart);
		},
		minusPizzaInCart(state, action: PayloadAction<CartItem>) {
			const findItem = state.pizzasInCart.find(obj => {
				return (
					obj.id === action.payload.id &&
					obj.type === action.payload.type &&
					obj.size === action.payload.size
				);
			});
			if (findItem && findItem.count > 1) {
				findItem.count--;
				state.totalPricePizzasInCart =
					state.totalPricePizzasInCart -
					(findItem.price + findItem.activePlusPrice);
			}
			state.totalCountPizzasInCart = state.pizzasInCart.reduce((count, obj) => {
				return obj.count + count;
			}, 0);
		},
		removePizzaInCart(state, action: PayloadAction<CartItem>) {
			state.pizzasInCart = state.pizzasInCart.filter(obj => {
				return (
					obj.id !== action.payload.id ||
					obj.type !== action.payload.type ||
					obj.size !== action.payload.size
				);
			});
			state.totalPricePizzasInCart = state.pizzasInCart.reduce((sum, obj) => {
				return Math.trunc(obj.price * (obj.size / 100 + 1)) * obj.count + sum;
			}, 0);
			state.totalCountPizzasInCart = state.pizzasInCart.reduce((count, obj) => {
				return obj.count + count;
			}, 0);
		},
		clearPizzasInCart(state) {
			state.pizzasInCart = [];
			state.totalPricePizzasInCart = 0;
			state.totalCountPizzasInCart = 0;
		},
		setFluidCartStatus(state, action: PayloadAction<boolean>) {
			state.fluidCartStatus = action.payload;
		},
		setOrderModal(state, action: PayloadAction<boolean>) {
			state.orderModal = action.payload;
		},
		setOrderTel(state, action: PayloadAction<string>) {
			state.orderTel = action.payload;
		},
	},
});

export const {
	addPizzaInCart,
	removePizzaInCart,
	minusPizzaInCart,
	clearPizzasInCart,
	setFluidCartStatus,
	setOrderModal,
	setOrderTel,
} = cartSlice.actions;

export default cartSlice.reducer;
