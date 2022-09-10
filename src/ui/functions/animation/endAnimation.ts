import { select } from "d3-selection";
import { Regl } from "regl";
import * as _ from "underscore";
import { CamerasManager } from "../../../cameras/camerasManager";
import { CatArgsManager } from "../../../cats/manager/catArgsManager";
import calcTextOffsets from "../../../matrixLabels/calcTextOffsets";
import genOrderedLabels from "../../../matrixLabels/genOrderedLabels";
import updateTextTriangleOrder from "../../../matrixLabels/updateTextTriangleOrder";
import { LabelsState } from "../../../state/reducers/labels/labelsSlice";
import { OrderState } from "../../../state/reducers/order/orderSlice";
import { VisualizationState } from "../../../state/reducers/visualization/visualizationSlice";
import { Axis } from "../../../types/general";

export default (function end_animation(
  regl: Regl,
  store: NamespacedStore,
  catArgsManager: CatArgsManager,
  camerasManager: CamerasManager
) {
  const dispatch = store.dispatch;

  dispatch(
    store.actions.mutateAnimationState({
      running: false,
      run_animation: false,
    })
  );
  // transfer the new positions to the matrix args attributes
  camerasManager.mutateReglProps({
    attributes: {
      pos_att_ini: {
        buffer: regl.buffer(store.select("arrs").position_arr.new),
        divisor: 1,
      },
    },
  });
  // transfer the new category positions to the cat args attributes
  _.each(["row", "col"], function (i_axis) {
    for (
      let cat_index = 0;
      cat_index < store.select("cat_data").cat_num[i_axis];
      cat_index++
    ) {
      // update the attribute
      catArgsManager.updateCatArgsAttribute(i_axis as Axis, cat_index);
    }
    // transfer new order to old order
    const orderInstance = store.select("order").new[i_axis];
    // turn dendrogram slider back on if necessary
    if (orderInstance === "clust") {
      select("." + i_axis + "_dendro_slider_svg").style("display", "block");
    }
    dispatch(
      store.actions.mutateOrderState({
        inst: {
          [i_axis]: orderInstance,
        },
      } as Partial<OrderState>)
    );
  });
  // transfer new order to text triangles
  // need to update text positions after animation
  const offset_dict: LabelsState["offset_dict"] = {};
  const text_triangles_draw: Record<string, any> = {};
  _.each(["row", "col"], function (i_axis) {
    text_triangles_draw[i_axis] = updateTextTriangleOrder(store, i_axis);
    offset_dict[i_axis] = calcTextOffsets(store, i_axis);
  });
  dispatch(
    store.actions.mutateVisualizationState({
      text_triangles: {
        draw: text_triangles_draw,
      } as VisualizationState["text_triangles"],
    })
  );
  // update ordered_labels
  genOrderedLabels(store);
  dispatch(
    store.actions.mutateLabelsState({
      offset_dict,
    })
  );
});
