export default (function run_hide_tooltip(
  store,
  tooltip_fun,
  click_on_heatmap = false
) {
  const tooltip = store.select("tooltip");
  if (tooltip.permanent_tooltip === false) {
    tooltip_fun.hide();
  }
  if (click_on_heatmap) {
    store.dispatch(
      store.actions.mutateTooltipState({
        permanent_tooltip: false,
      })
    );
    tooltip_fun.hide();
  }

  store.dispatch(
    store.actions.mutateCategoriesState({ showing_color_picker: false })
  );
});
