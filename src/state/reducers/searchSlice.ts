import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SearchState {
  searched_rows: string[];
}

const initialState: SearchState = {
  searched_rows: [],
};

export const searchSlice = (id: string) =>
  createSlice({
    name: `${id}_search`,
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
      setSearchedRows: (
        state,
        action: PayloadAction<SearchState["searched_rows"]>
      ) => {
        state.searched_rows = action.payload;
        return state;
      },
    },
  });
