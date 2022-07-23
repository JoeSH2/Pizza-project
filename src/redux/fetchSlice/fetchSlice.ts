import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Sort } from "../sortingSlice/sortingSlice";

export type ProductValue = {
  id: number;
  sizes: number[];
  types: number[];
  price: number[];
  title: string;
  imageUrl: string;
};

type PizzaParams = {
  activeCategory: number;
  inputSearch: string;
  activeSort: Sort;
};

interface IFetchState {
  items: ProductValue[];
  statusLoading: "pending" | "completed" | "rejected";
}

const initialState: IFetchState = {
  items: [],
  statusLoading: "pending" || "completed" || "rejected",
};

export const fetchPizza = createAsyncThunk<ProductValue[], PizzaParams>(
  "pizza/fetchPizzaStatus",
  async (params) => {
    const { activeCategory, inputSearch, activeSort } = params;
    const { data } = await axios.get<ProductValue[]>(
      `https://629122a227f4ba1c65c87726.mockapi.io/items?${
        activeCategory > 0 ? `category=${activeCategory}` : ""
      }&sortBy=${activeSort.sortProperty}${
        inputSearch ? `&search=${inputSearch}` : ""
      }`
    );
    return data;
  }
);

const fetchSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizza.pending, (state) => {
      state.statusLoading = "pending";
    });
    builder.addCase(fetchPizza.fulfilled, (state, action) => {
      state.items = action.payload;
      state.statusLoading = "completed";
    });
    builder.addCase(fetchPizza.rejected, (state) => {
      state.statusLoading = "rejected";
    });
  },
});

export const { setItems } = fetchSlice.actions;

export default fetchSlice.reducer;
