import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClustergrammerProps } from "../../index.types";

const initialState: ClustergrammerProps = {} as ClustergrammerProps;

export const argsSlice = (id: string) =>
  createSlice({
    name: `${id}_args`,
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
      setArgs: (_, action: PayloadAction<ClustergrammerProps>) => {
        return action.payload;
      },
    },
  });
