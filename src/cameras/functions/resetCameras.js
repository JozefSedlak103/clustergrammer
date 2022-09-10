import ini_zoom_data from "../../state/reducers/visualization/helpers/iniZoomData";
import make_cameras from "./makeCameras";

export default function reset_cameras(regl, store) {
  const dispatch = store.dispatch;
  dispatch(
    store.actions.mutateVisualizationState({
      reset_cameras: false,
    })
  );

  dispatch(store.actions.mutateZoomData(ini_zoom_data()));
  const cameras = make_cameras(regl, store);
  dispatch(store.actions.mutateLabelsState({ draw_labels: false }));
  dispatch(store.actions.mutateAnimationState({ ini_viz: true }));
  dispatch(store.actions.mutateInteractionState({ total: 0 }));

  return cameras;
}
