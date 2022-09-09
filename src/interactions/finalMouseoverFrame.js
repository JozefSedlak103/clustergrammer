export default (function finalMouseoverFrame(store) {
  // reduce the number of mouseovers
  store.dispatch(
    store.actions.setTotalMouseover(
      store.select("visualization").total_mouseover - 1
    )
  );
  if (
    store.select("visualization").total_mouseover === 0 &&
    store.select("interaction").still_mouseover === false
  ) {
    store.dispatch(
      store.actions.mutateTooltipState({
        show_tooltip: true,
      })
    );
  }
});
