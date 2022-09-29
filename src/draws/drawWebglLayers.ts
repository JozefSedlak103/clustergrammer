import { Regl } from "regl";
import { CamerasManager } from "../cameras/camerasManager";
import { CatArgsManager } from "../cats/manager/catArgsManager";
import { NamespacedStore } from "../state/store/store";
import drawAxisComponents from "./drawAxisComponents";
import { drawDebugComponents } from "./drawDebugComponents";
import drawMatrixComponents from "./drawMatrixComponents";
import drawStaticComponents from "./static/drawStaticComponents";

export default function draw_webgl_layers(
  regl: Regl,
  store: NamespacedStore,
  catArgsManager: CatArgsManager,
  camerasManager: CamerasManager
) {
  const cameras = camerasManager.getCameras();
  const reglProps = camerasManager.getReglProps();
  drawMatrixComponents(regl, store, cameras, reglProps);
  const draw_labels = store.select("labels").draw_labels;
  drawAxisComponents(regl, store, catArgsManager, cameras, "row", draw_labels);
  drawAxisComponents(regl, store, catArgsManager, cameras, "col", draw_labels);
  drawStaticComponents(regl, store, cameras);
  if (store.select("visualization").debug) {
    drawDebugComponents(regl, store, cameras);
  }
}
