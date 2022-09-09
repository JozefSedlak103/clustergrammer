import { cloneDeep } from "lodash";
import * as _ from "underscore";
import genOrderedLabels from "../../../matrixLabels/genOrderedLabels";

export default function initializeLabels(store, labelLength) {
  const labels = cloneDeep(store.select("labels"));
  labels.num_row = store.select("network").mat.length;
  labels.num_col = store.select("network").mat[0].length;
  // generate titles if necessary
  let inst_label;
  _.each(["row", "col"], function (inst_axis) {
    // initialize with empty title
    labels.titles[inst_axis] = "";
    inst_label = store.select("network")[inst_axis + "_nodes"][0].name;
    if (inst_label.indexOf(": ") > 0) {
      labels.titles[inst_axis] = inst_label.split(": ")[0];
    }
    // pre-calc text triangles if low enough number of labels
    labels.precalc[inst_axis] = false;
  });
  store.dispatch(
    store.actions.mutateLabelsState({
      ...labels,
      ...(labelLength ? { labelLength } : {}),
    })
  );
  genOrderedLabels(store);
}
