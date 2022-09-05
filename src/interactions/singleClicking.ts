import { Store } from "@reduxjs/toolkit";
import { OnClickCallback } from "..";
import { mutateAnimationState } from "../state/reducers/animation/animationSlice";
import { mutateInteractionState } from "../state/reducers/interaction/interactionSlice";
import { RootState } from "../state/store/store";

export default function singleClicking(
  store: Store<RootState>,
  onClick: OnClickCallback
) {
  const dispatch = store.dispatch;
  const state = store.getState();

  dispatch(mutateAnimationState({ last_click: state.animation.time }));
  dispatch(mutateInteractionState({ manual_update_cats: false }));

  const tooltipType = state.tooltip.tooltip_type;

  // onClick callback
  if (onClick && tooltipType && tooltipType !== "out-of-bounds") {
    // TODO: replace tooltip type strings with enum
    const mouseover = state.interaction.mouseover;
    onClick({
      row: mouseover.row.name || null,
      col: mouseover.col.name || null,
    });
  }

  // dendrogram click
  if (tooltipType.includes("-dendro")) {
    if (state.tooltip.permanent_tooltip === false) {
      // TODO: do whatever we want to do when clicking the dendrogram
    }
  }
}
