import display_and_position_tooltip from "./displayAndPositionTooltip";
import makeTooltipText from "./makeTooltipText";
import remove_lost_tooltips from "./removeLostTooltips";

export default (function runShowTooltip(
  regl,
  store,
  catArgsManager,
  camerasManager,
  tooltip_fun
) {
  if (store.select("tooltip").permanent_tooltip === false) {
    remove_lost_tooltips();
    makeTooltipText(
      regl,
      store,
      catArgsManager,
      camerasManager,
      tooltip_fun,
      store.select("interaction").mouseover
    );
    display_and_position_tooltip(store);
  }
});
