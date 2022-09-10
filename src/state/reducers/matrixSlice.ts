import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { merge } from "lodash";

export interface MatrixState {
  opacity_scale: number;
  potential_recluster: {
    distance_metric: string;
    linkage_type: string;
  };
  distance_metric: string;
  linkage_type: string;
}

const defaults = {
  distance_metric: "cosine",
  linkage_type: "average",
};
const initialState: MatrixState = {
  ...defaults,
  opacity_scale: 0.5,
  potential_recluster: {
    ...defaults,
  },
};

export const matrixSlice = (id: string) =>
  createSlice({
    name: `${id}_matrix`,
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
      setMatrixState: (state, action: PayloadAction<MatrixState>) => {
        state = action.payload;
        return state;
      },
      mutateMatrixState: (
        state,
        action: PayloadAction<Partial<MatrixState>>
      ) => {
        state = merge(state, action.payload);
        return state;
      },
      setOpacityScale: (
        state,
        action: PayloadAction<MatrixState["opacity_scale"]>
      ) => {
        state.opacity_scale = action.payload;
        return state;
      },
    },
  });
