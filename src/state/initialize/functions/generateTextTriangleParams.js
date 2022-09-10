import * as _ from "underscore";
import gather_text_triangles from "../../../matrixLabels/gatherTextTriangles";

export default (function generateTextTriangleParams(store, viz_area) {
  const { labels, visualization } = store.selectAll();
  // save text triangles for later use
  const text_triangles = {
    row: {},
    col: {},
    draw: {
      row: [],
      col: [],
    },
  };
  store.dispatch(
    store.actions.mutateVisualizationState({
      text_triangles,
    })
  );

  const precalc = {};
  _.each(["row", "col"], function (inst_axis) {
    precalc[inst_axis] =
      labels["num_" + inst_axis] < visualization.max_num_text;
    store.dispatch(
      store.actions.mutateLabelsState({
        precalc,
      })
    );
    // initial drawing of labels
    if (precalc[inst_axis] === false) {
      text_triangles.draw = {};
      text_triangles.draw[inst_axis] = false;
    } else {
      gather_text_triangles(store, viz_area, inst_axis);
    }
  });

  // visualization updates
  store.dispatch(
    store.actions.mutateVisualizationState({
      text_triangles,
    })
  );
});
