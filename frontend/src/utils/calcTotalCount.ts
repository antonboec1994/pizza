import type { CartItem } from '../redux/cart/types';

export const calcTotalCount = (pizzasInCart: CartItem[]) => {
	return pizzasInCart.reduce((count, obj) => obj.count + count, 0);
};
