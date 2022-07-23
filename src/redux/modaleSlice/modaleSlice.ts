import { createSlice } from "@reduxjs/toolkit";

type PizzaInfo = {
  imageUrl: string
  title: string,
}

interface IModaleState {
  modaleProduct: PizzaInfo,
  modaleCard: boolean,
}

const initialState: IModaleState = {
  modaleProduct: {
    imageUrl: '',
    title: '',
  },
  modaleCard: false,
};

const modaleSlice = createSlice({
  name: "modale",
  initialState,
  reducers: {
    getProduct(state, action) {
      state.modaleProduct = action.payload;
    },
    setModaleCard(state, action) {
      state.modaleCard = action.payload;
    },
  },
});

export const { setModaleCard, getProduct } = modaleSlice.actions;

export default modaleSlice.reducer;
