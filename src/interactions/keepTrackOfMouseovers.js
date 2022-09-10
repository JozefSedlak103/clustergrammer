export default function keep_track_of_mouseovers(store) {
  const dispatch = store.dispatch;

  // keep track of mouseovers
  if (store.select("interaction").still_mouseover === false) {
    dispatch(store.actions.mutateInteractionState({ still_mouseover: true }));
    // wait some time to confirm still not interacting
    setTimeout(function () {
      dispatch(
        store.actions.mutateInteractionState({ still_mouseover: false })
      );
    }, 1000);
  }
}
