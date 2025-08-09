export type CartItem = {
  id: string;
  title: string;
  price: number;
  type: string;
  size: number;
  imageUrl: string;
  description: string;
  count: number;
  activePlusPrice: number;
};

export interface CartSliceInitialState {
  totalPricePizzasInCart: number;
  totalCountPizzasInCart: number;
  pizzasInCart: CartItem[];
  newPriceInCart: number;
  currentAddedPizza: CartItem;
  fluidCartStatus: boolean;
  orderModal: boolean;
  orderTel: string;
}
