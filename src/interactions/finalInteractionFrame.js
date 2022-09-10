export default (function final_interaction_frame(store) {
  const dispatch = store.dispatch;
  // reduce the number of interactions
  if (
    store.select("interaction").total === 0 &&
    store.select("animation").ini_viz === false
  ) {
    // preventing from running on first frame
    if (store.select("animation").first_frame === false) {
      // run draw commands
      dispatch(
        store.actions.mutateLabelsState({
          draw_labels: true,
        })
      );
    } else {
      dispatch(
        store.actions.mutateAnimationState({
          first_frame: false,
        })
      );
    }
  }
  dispatch(
    store.actions.mutateInteractionState({
      total: store.select("interaction").total - 1,
    })
  );
});
