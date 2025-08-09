import type { CartItem } from '@/redux/cart/types';

export const calcTotalPrice = (pizzasInCart: CartItem[]) => {
	return pizzasInCart.reduce(
		(sum, obj) => (obj.price + obj.activePlusPrice) * obj.count + sum,
		0
	);
};
