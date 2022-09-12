import colorToRgba from "../../../colors/colorToRgba";
import { ClustergrammerProps } from "../../../index.types";
import { MatColors } from "../../reducers/catVizSlice";
import { NamespacedStore } from "../../store/store";

export default function setCatVizMatrixColors(
  store: NamespacedStore,
  args: Partial<ClustergrammerProps>
) {
  const network = store.select("network");
  // by default just use blue and red
  const matColors: MatColors = {
    pos: colorToRgba("red").slice(0, 3),
    neg: colorToRgba("blue").slice(0, 3),
  };
  // prioritize matrix colors passed in by args
  if (args.matrixColors) {
    matColors.pos = args.matrixColors.pos;
    matColors.neg = args.matrixColors.neg;
  } else if ("matrix_colors" in network) {
    // secondarily prioritize matrix colors defined by the network
    const pos_color = network?.matrix_colors?.pos;
    const neg_color = network?.matrix_colors?.neg;
    matColors.pos = colorToRgba(pos_color).slice(0, 3);
    matColors.neg = colorToRgba(neg_color).slice(0, 3);
  }

  store.dispatch(
    store.actions.mutateCatVizState({
      mat_colors: matColors,
    })
  );
}
