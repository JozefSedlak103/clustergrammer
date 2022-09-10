import { combineReducers } from "@reduxjs/toolkit";
import { reduce } from "lodash";
import { animationSlice } from "./animation/animationSlice";
import { arrsSlice } from "./arrsSlice";
import { categoriesSlice } from "./categoriesSlice";
import { catVizSlice } from "./catVizSlice";
import { dendrogramSlice } from "./dendrogramSlice";
import { downloadSlice } from "./downloadSlice";
import { interactionSlice } from "./interaction/interactionSlice";
import { labelsSlice } from "./labels/labelsSlice";
import { matrixSlice } from "./matrixSlice";
import { networkSlice } from "./networkSlice";
import { nodeCanvasPosSlice } from "./nodeCanvasPosSlice";
import { orderSlice } from "./order/orderSlice";
import { rowAndColCanvasPositionsSlice } from "./rowAndColCanvasPositionsSlice";
import { searchSlice } from "./searchSlice";
import { tooltipSlice } from "./tooltip/tooltipSlice";
import { uiSlice } from "./uiSlice";
import { visualizationSlice } from "./visualization/visualizationSlice";

export type SliceNames =
  | "network"
  | "ui"
  | "matrix"
  | "dendro"
  | "download"
  | "animation"
  | "order"
  | "categories"
  | "interaction"
  | "tooltip"
  | "labels"
  | "cat_viz"
  | "rowAndColCanvasPositions"
  | "visualization"
  | "nodeCanvasPos"
  | "search"
  | "arrs";

export const initSlices = (id: string) => {
  const slices = [
    networkSlice,
    uiSlice,
    matrixSlice,
    dendrogramSlice,
    downloadSlice,
    animationSlice,
    orderSlice,
    categoriesSlice,
    interactionSlice,
    tooltipSlice,
    labelsSlice,
    catVizSlice,
    rowAndColCanvasPositionsSlice,
    visualizationSlice,
    nodeCanvasPosSlice,
    searchSlice,
    arrsSlice,
  ];

  const initializedSlices = slices.map((s) => s(id));

  const reducers = combineReducers(
    reduce(
      initializedSlices,
      (acc, s) => {
        acc[s.name] = s.reducer;
        return acc;
      },
      {} as Record<string, any>
    )
  );

  const actions = Object.assign({}, ...initializedSlices.map((s) => s.actions));

  return {
    reducers,
    actions,
  };
};
