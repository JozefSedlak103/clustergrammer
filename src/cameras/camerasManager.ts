import { merge } from "lodash";
import { Regl } from "regl";
import make_matrix_args from "../matrixCells/makeMatrixArgs";
import { NamespacedStore } from "../state/store/store";
import { CameraInstance, Cameras } from "./cameras";
import make_cameras from "./functions/makeCameras";
import reset_cameras from "./functions/resetCameras";

export class CamerasManager {
  readonly #regl: Regl;
  #reglProps: any;
  #cameras: Record<string, CameraInstance>;

  constructor(regl: Regl, store: NamespacedStore) {
    this.#regl = regl;
    this.#cameras = make_cameras(this.#regl, store) as unknown as Cameras;
    this.#reglProps = make_matrix_args(regl, store);
  }

  resetCameras(store: NamespacedStore) {
    const cameras = reset_cameras(this.#regl, store);
    this.#cameras = cameras as unknown as Cameras;
  }

  getCameras() {
    return this.#cameras;
  }

  mutateReglProps(newProps: any) {
    this.#reglProps = merge(this.#reglProps, newProps);
  }

  remakeMatrixArgs(store: NamespacedStore) {
    this.#reglProps = make_matrix_args(this.#regl, store);
  }

  getReglProps() {
    return this.#reglProps;
  }

  getReglInstance() {
    return this.#regl;
  }
}
