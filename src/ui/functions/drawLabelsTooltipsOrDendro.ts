import { Regl } from "regl";
import { CamerasManager } from "../../cameras/camerasManager";
import { CatArgsManager } from "../../cats/manager/catArgsManager";
import drawCommands from "../../draws/drawCommands";
import { NamespacedStore } from "../../state/store/store";

export default function drawLabelsTooltipsOrDendro(
  regl: Regl,
  store: NamespacedStore,
  catArgsManager: CatArgsManager,
  camerasManager: CamerasManager
) {
  const dispatch = store.dispatch;

  // turn back on draw_labels
  // /////////////////////////////
  drawCommands(regl, store, catArgsManager, camerasManager);

  if (store.select("tooltip").show_tooltip) {
    dispatch(
      store.actions.mutateTooltipState({
        show_tooltip: false,
      })
    );
  }
  // turn back off draw dendro
  if (store.select("dendro").update_dendro) {
    dispatch(
      store.actions.mutateDendrogramState({
        update_dendro: false,
      })
    );
  }
}
