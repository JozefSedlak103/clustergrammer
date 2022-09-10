import finalInteractionFrame from "../interactions/finalInteractionFrame";
import drawCommands from "./drawCommands";

export default (function drawInteracting(regl, store, catArgsManager, cameras) {
  const dispatch = store.dispatch;

  const wait_time_final_interact = 100;

  let ini_viz = store.select("animation").ini_viz;
  let time_remain = store.select("animation").time_remain;
  drawCommands(regl, store, catArgsManager, cameras);
  setTimeout(finalInteractionFrame, wait_time_final_interact, store);
  ini_viz = false;
  const animation = store.select("animation");
  if (animation.time_remain > 0) {
    time_remain = animation.time_remain - 1;
  }
  dispatch(
    store.actions.mutateInteractionState({
      total: store.select("interaction").total + 1,
    })
  );
  dispatch(
    store.actions.mutateAnimationState({
      time_remain,
      ini_viz,
    })
  );
});
