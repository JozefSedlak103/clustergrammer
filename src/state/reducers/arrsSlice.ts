import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { merge } from "lodash";

export interface ArrsState {
  opacity_arr: any[];
  position_arr: {
    ini: any[][];
    new: any[][];
  };
}

const initialState: ArrsState = {} as ArrsState;

export const arrsSlice = (id: string) =>
  createSlice({
    name: `${id}_arrs`,
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
      setArrsState: (state, action: PayloadAction<ArrsState>) => {
        state = action.payload;
        return state;
      },
      mutateArrsState: (state, action: PayloadAction<Partial<ArrsState>>) => {
        state = merge(state, action.payload);
        return state;
      },
    },
  });
