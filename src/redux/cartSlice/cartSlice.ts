import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PizzaItems = {
  id: number;
  sizes: number;
  types: string;
  price: number;
  title: string;
  imageUrl: string;
  count: number;
};

export interface ICardState {
  totalPrice: number;
  product: PizzaItems[];
}

const initialState: ICardState = {
  totalPrice: 0,
  product: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<PizzaItems>) {
      const findProduct = state.product.find(
        (obj) =>
          obj.id + obj.sizes + obj.types + obj.price ===
          action.payload.id +
            action.payload.sizes +
            action.payload.types +
            action.payload.price
      );
      if (findProduct) {
        findProduct.count++;
      } else {
        state.product.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = state.product.reduce((previousValue, currentValue) => {
        return currentValue.price * currentValue.count + previousValue;
      }, initialState.totalPrice);
    },
    minusProduct(state, action: PayloadAction<PizzaItems>) {
      const findProduct = state.product.find(
        (obj) =>
          obj.id + obj.sizes + obj.types + obj.price ===
          action.payload.id +
            action.payload.sizes +
            action.payload.types +
            action.payload.price
      );
      if (findProduct) {
        findProduct.count--;
      } else {
        state.product.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = state.product.reduce((_, currentValue) => {
        return state.totalPrice - currentValue.price;
      }, initialState.totalPrice);
    },
    removeProduct(state, action: PayloadAction<PizzaItems>) {
      state.product = state.product.filter(
        (obj) =>
          obj.id + obj.sizes + obj.types + obj.price !==
          action.payload.id +
            action.payload.sizes +
            action.payload.types +
            action.payload.price
      );

      state.totalPrice = state.product.reduce((previousValue, currentValue) => {
        return currentValue.price * currentValue.count + previousValue;
      }, initialState.totalPrice);
    },
    clearCart(state) {
      state.product = [];
      state.totalPrice = 0;
    },
  },
});

export const { addProduct, minusProduct, removeProduct, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
