import { Store } from "@reduxjs/toolkit";
import { Regl } from "regl";
import { CamerasManager } from "../../cameras/camerasManager";
import { CatArgsManager } from "../../cats/manager/catArgsManager";
import drawCommands from "../../draws/drawCommands";
import { mutateDendrogramState } from "../../state/reducers/dendrogramSlice";
import { RootState } from "../../state/store/store";

export default function drawLabelsTooltipsOrDendro(
  regl: Regl,
  store: Store<RootState>,
  catArgsManager: CatArgsManager,
  camerasManager: CamerasManager
) {
  const state = store.getState();
  const dispatch = store.dispatch;

  // turn back on draw_labels
  // /////////////////////////////
  drawCommands(regl, store, catArgsManager, camerasManager);

  // turn back off draw dendro
  if (state.dendro.update_dendro) {
    dispatch(
      mutateDendrogramState({
        update_dendro: false,
      })
    );
  }
}
