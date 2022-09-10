import { select } from "d3-selection";
import { cloneDeep } from "lodash";
import { Regl } from "regl";
import alt_slice_linkage from "./altSliceLinkage";
import calcDendroTriangles from "./calcDendroTriangles";

export default (function changeGroups(
  regl: Regl,
  store: NamespacedStore,
  axis: "row" | "col",
  slider_value: number
) {
  const { dendro, visualization } = store.selectAll();
  const dispatch = store.dispatch;
  const newDendrogramState = cloneDeep(dendro);
  newDendrogramState.update_dendro = true;
  if (newDendrogramState.precalc_linkage) {
    const dist_thresh =
      newDendrogramState.max_linkage_dist[axis] * slider_value;
    alt_slice_linkage(
      store,
      axis,
      dist_thresh,
      newDendrogramState.min_dist[axis]
    );
    const rounded_slider_value = Math.round(slider_value * 100) / 100;
    // update slider
    select(
      visualization.rootElementId +
        " ." +
        axis +
        "_dendro_slider_svg .dendro_level_text"
    ).text(rounded_slider_value);
  } else {
    newDendrogramState.group_level[axis] = slider_value;
  }
  newDendrogramState.group_info[axis] = calcDendroTriangles(
    store,
    newDendrogramState,
    axis
  );
  dispatch(store.actions.setDendrogramState(newDendrogramState));
});
