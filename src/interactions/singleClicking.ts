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

  // onClick callback
  if (onClick) {
    const mouseover = state.interaction.mouseover;
    onClick({
      row: mouseover.row.name || null,
      col: mouseover.col.name || null,
    });
  }

  // dendrogram click
  if (state.tooltip.tooltip_type.includes("-dendro")) {
    if (state.tooltip.permanent_tooltip === false) {
      // TODO: do whatever we want to do when clicking the dendrogram
    }
  }
}
