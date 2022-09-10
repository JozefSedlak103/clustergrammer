import { selectAll } from "d3-selection";
import finalMouseoverFrame from "../../../interactions/finalMouseoverFrame";

const WAIT_TIME_FINAL_MOUSEOVER = 100;

export default (function drawMouseover(store) {
  selectAll(
    store.select("visualization").rootElementId + " .group-svg-tooltip"
  ).remove();

  setTimeout(finalMouseoverFrame, WAIT_TIME_FINAL_MOUSEOVER, store);
  store.dispatch(
    store.actions.setTotalMouseover(
      store.select("visualization").total_mouseover + 1
    )
  );
});
