import { Store } from "@reduxjs/toolkit";
import { selectAll } from "d3-selection";
import { Regl } from "regl";
import { CamerasManager } from "../../../cameras/camerasManager";
import { CatArgsManager } from "../../../cats/manager/catArgsManager";
import drawInteracting from "../../../draws/drawInteracting";
import { mutateAnimationState } from "../../../state/reducers/animation/animationSlice";
import { mutateInteractionState } from "../../../state/reducers/interaction/interactionSlice";
import { RootState } from "../../../state/store/store";
import draw_background_calculations from "../drawBackgroundCalculations";
import drawLabelsTooltipsOrDendro from "../drawLabelsTooltipsOrDendro";
import end_animation from "./endAnimation";
import start_animation from "./startAnimation";

export default function run_viz(
  regl: Regl,
  store: Store<RootState>,
  catArgsManager: CatArgsManager,
  camerasManager: CamerasManager
) {
  const dispatch = store.dispatch;
  dispatch(
    mutateAnimationState({
      first_frame: true,
    })
  );
  // function to run on every frame
  regl.frame(function ({ time }) {
    dispatch(
      mutateAnimationState({
        time,
      })
    );
    const firstState = store.getState();
    if (firstState.interaction.total > 1) {
      selectAll(
        firstState.visualization.rootElementId + " .group-svg-tooltip"
      ).remove();
    }

    // prevent this from being negative, can happen when resetting zoom
    if (firstState.interaction.total < 0) {
      dispatch(mutateInteractionState({ total: 0 }));
    }
    if (firstState.visualization.reset_cameras) {
      // reset cameras mutates zoom data
      camerasManager.resetCameras(store);
    }

    const thirdState = store.getState();
    if (thirdState.animation.run_animation) {
      // modifies animation duration end
      start_animation(store);
    } else if (
      thirdState.animation.time > thirdState.animation.duration_end &&
      thirdState.animation.running === true
    ) {
      end_animation(regl, store, catArgsManager, camerasManager);
    }

    if (
      store.getState().interaction.still_interacting ||
      store.getState().animation.ini_viz ||
      store.getState().animation.running ||
      store.getState().animation.update_viz
    ) {
      drawInteracting(regl, store, catArgsManager, camerasManager);
      dispatch(mutateAnimationState({ update_viz: false }));
    } else if (store.getState().tooltip.show_tooltip) {
      // mouseover may result in draw command
      draw_background_calculations(store);
    } else if (
      store.getState().labels.draw_labels ||
      // fourthState.tooltip.show_tooltip || // TODO: remove if not needed?
      store.getState().dendro.update_dendro
    ) {
      drawLabelsTooltipsOrDendro(regl, store, catArgsManager, camerasManager);
    } else {
      // run background calculations
      draw_background_calculations(store);
    }
  });
}
