import { configureStore, Store } from "@reduxjs/toolkit";
import _, { reduce } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { MatrixState } from "../../state/reducers/matrixSlice";
import { AnimationState } from "../reducers/animation/animationSlice";
import { ArrsState } from "../reducers/arrsSlice";
import { CategoriesState } from "../reducers/categoriesSlice";
import { CatVizState } from "../reducers/catVizSlice";
import { initSlices, SliceNames } from "../reducers/createReducers";
import { DendrogramState } from "../reducers/dendrogramSlice";
import { DownloadState } from "../reducers/downloadSlice";
import { InteractionState } from "../reducers/interaction/interactionSlice";
import { LabelsState } from "../reducers/labels/labelsSlice";
import { NetworkState } from "../reducers/networkSlice";
import { NodeCanvasPos } from "../reducers/nodeCanvasPosSlice";
import { OrderState } from "../reducers/order/orderSlice";
import { RowAndColCanvasPositions } from "../reducers/rowAndColCanvasPositionsSlice";
import { SearchState } from "../reducers/searchSlice";
import { TooltipState } from "../reducers/tooltip/tooltipSlice";
import { UIState } from "../reducers/uiSlice";
import { VisualizationState } from "../reducers/visualization/visualizationSlice";

function getNamespacedPath(
  path: string | string[],
  uuid: string
): string | string[] {
  let namespacedPath = path;
  if (typeof namespacedPath === "string") {
    namespacedPath = `${uuid}_${namespacedPath}`;
  } else if (typeof namespacedPath === "object") {
    namespacedPath[0] = `${uuid}_${namespacedPath[0]}`;
  }
  return namespacedPath;
}

export const createStore = (): NamespacedStore => {
  const uuid = uuidv4();
  const { reducers, actions } = initSlices(uuid);
  const store: NamespacedStore = {
    ...configureStore({
      reducer: reducers,
      middleware: [],
    }),
    select: (path: string | string[]) => {
      const namespacedPath = getNamespacedPath(path, uuid);
      return _.get(store.getState(), namespacedPath, null);
    },
    selectAll: () => {
      return reduce(
        Object.entries(store.getState()),
        (acc, [key, value]) => {
          acc[key.replace(`${uuid}_`, "")] = value;
          return acc;
        },
        {} as Record<string, any>
      );
    },
    actions,
  };
  return store;
};

export type RootState =
  | NetworkState
  | UIState
  | MatrixState
  | DendrogramState
  | DownloadState
  | AnimationState
  | OrderState
  | CategoriesState
  | InteractionState
  | TooltipState
  | LabelsState
  | CatVizState
  | RowAndColCanvasPositions
  | VisualizationState
  | NodeCanvasPos
  | SearchState
  | SearchState
  | ArrsState;

export interface NamespacedStore extends Store {
  actions: any;
  select: (path: string | string[]) => any;
  selectAll: () => Record<SliceNames, any>;
}
