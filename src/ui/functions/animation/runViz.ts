import { selectAll } from "d3-selection";
import { Regl } from "regl";
import { CamerasManager } from "../../../cameras/camerasManager";
import { CatArgsManager } from "../../../cats/manager/catArgsManager";
import drawInteracting from "../../../draws/drawInteracting";
import { NamespacedStore } from "../../../state/store/store";
import draw_background_calculations from "../drawBackgroundCalculations";
import drawLabelsTooltipsOrDendro from "../drawLabelsTooltipsOrDendro";
import drawMouseover from "../mouseover/drawMouseover";
import end_animation from "./endAnimation";
import start_animation from "./startAnimation";

export default function run_viz(
  regl: Regl,
  store: NamespacedStore,
  catArgsManager: CatArgsManager,
  camerasManager: CamerasManager
) {
  const dispatch = store.dispatch;
  dispatch(
    store.actions.mutateAnimationState({
      first_frame: true,
    })
  );
  // function to run on every frame
  regl.frame(function ({ time }) {
    dispatch(
      store.actions.mutateAnimationState({
        time,
      })
    );
    const firstState = store.selectAll();
    if (firstState.interaction.total > 1) {
      selectAll(
        firstState.visualization.rootElementId + " .group-svg-tooltip"
      ).remove();
    }

    // prevent this from being negative, can happen when resetting zoom
    if (firstState.interaction.total < 0) {
      dispatch(store.actions.mutateInteractionState({ total: 0 }));
    }
    if (firstState.visualization.reset_cameras) {
      // reset cameras mutates zoom data
      camerasManager.resetCameras(store);
    }

    const thirdState = store.selectAll();
    if (thirdState.animation.run_animation) {
      // modifies animation duration end
      start_animation(store);
    } else if (
      thirdState.animation.time > thirdState.animation.duration_end &&
      thirdState.animation.running === true
    ) {
      end_animation(regl, store, catArgsManager, camerasManager);
    }

    const fourthState = store.selectAll();
    if (
      fourthState.interaction.still_interacting === true ||
      fourthState.animation.ini_viz === true ||
      fourthState.animation.running === true ||
      fourthState.animation.update_viz === true
    ) {
      drawInteracting(regl, store, catArgsManager, camerasManager);
      dispatch(store.actions.mutateAnimationState({ update_viz: false }));
    } else if (fourthState.interaction.still_mouseover === true) {
      // mouseover may result in draw command
      drawMouseover(store);
      draw_background_calculations(store);
    } else if (
      fourthState.labels.draw_labels ||
      fourthState.tooltip.show_tooltip ||
      fourthState.dendro.update_dendro
    ) {
      drawLabelsTooltipsOrDendro(regl, store, catArgsManager, camerasManager);
    } else {
      // run background calculations
      draw_background_calculations(store);
    }
  });
}
