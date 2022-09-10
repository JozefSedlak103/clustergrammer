export default (function keepTrackOfInteractions(store) {
  const dispatch = store.dispatch;

  const wait_time_final_interact = 100;
  // keep track of interactions
  if (store.select("interaction").still_interacting === false) {
    dispatch(store.actions.mutateInteractionState({ still_interacting: true }));
    // wait some time to confirm still not interacting
    setTimeout(function () {
      dispatch(
        store.actions.mutateInteractionState({ still_interacting: false })
      );
    }, wait_time_final_interact);
  }
});
