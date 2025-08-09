import { calcTotalCount } from "./calcTotalCount";
import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLS = () => {
  const data = localStorage.getItem("cart");
  const pizzasInCart = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(pizzasInCart);
  const totalCount = calcTotalCount(pizzasInCart);

  return {
    pizzasInCart,
    totalPrice,
    totalCount,
  };
};
