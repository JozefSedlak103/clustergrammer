import * as _ from "underscore";
import vectorize_label from "../../matrixLabels/vectorizeLabel";

export default (function draw_background_calculations(store) {
  const dispatch = store.dispatch;

  _.each(["row", "col"], function (inst_axis) {
    const oldLabels = store.select("labels");
    if (oldLabels.labels_queue.high[inst_axis].length > 0) {
      const inst_name = oldLabels.labels_queue.high[inst_axis][0];
      const inst_text_vect = vectorize_label(
        store.select("labels").font_detail,
        inst_axis,
        inst_name,
        false
      );
      store.dispatch(
        store.actions.mutateVisualizationState({
          text_triangles: {
            [inst_axis]: {
              [inst_name]: inst_text_vect,
            },
          },
        })
      );
      dispatch(
        store.actions.dropFromLabelQueue({
          queue: "high",
          axis: inst_axis,
          label: inst_name,
        })
      );
      const newLabels = store.select("labels");

      // once all the high priority labels have been processed in the background,
      // run the visualization
      if (
        newLabels.labels_queue.high[inst_axis].length === 0 &&
        newLabels.precalc[inst_axis] === false
      ) {
        dispatch(store.actions.mutateAnimationState({ update_viz: true }));
      }
    }
  });
});
