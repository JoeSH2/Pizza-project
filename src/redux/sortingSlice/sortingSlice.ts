import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Sort = {
  name: string;
  sortProperty: "raiting" | "price" | "title";
};

interface ISortingState {
  inputSearch: string;
  activeCategory: number;
  activeSort: Sort;
}

const initialState: ISortingState = {
  inputSearch: "",
  activeCategory: 0,
  activeSort: {
    name: "популярности",
    sortProperty: "raiting",
  },
};

const sortingSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setActiveCategory(state, action: PayloadAction<number>) {
      state.activeCategory = action.payload;
    },
    setActiveSort(state, action: PayloadAction<Sort>) {
      state.activeSort = action.payload;
    },
    setInputSearch(state, action: PayloadAction<string>) {
      state.inputSearch = action.payload;
    },
    setFilter(state, action: PayloadAction<ISortingState>) {
      state.activeSort = action.payload.activeSort;
      state.activeCategory = Number(action.payload.activeCategory);
    },
  },
});

export const { setActiveCategory, setActiveSort, setInputSearch, setFilter } =
  sortingSlice.actions;

export default sortingSlice.reducer;
