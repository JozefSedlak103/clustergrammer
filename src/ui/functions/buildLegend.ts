import { flatten } from "lodash";
import rgbArrayToString from "../../colors/rgbArrayToString";
import { NamespacedStore } from "../../state/store/store";
import customRound from "../../utils/customRound";
import { CANVAS_CONTAINER_CLASSNAME } from "../ui.const";

export const LEGEND_HEIGHT = "50%";
export const LEGEND_WIDTH = "20%";

export const buildLegend = (store: NamespacedStore) => {
  const colors = store.select("cat_viz").mat_colors;
  const mat = store.select("network").mat;
  const flatMat = flatten<number>(mat);
  const containerId = store.select("visualization").rootElementId;

  const legend = document.createElement("div");
  legend.id = `${containerId}-legend`;
  legend.style.height = LEGEND_HEIGHT;
  legend.style.width = LEGEND_WIDTH;
  legend.style.position = "absolute";
  legend.style.top = "15%";
  legend.style.right = `-${LEGEND_WIDTH}`;
  legend.style.display = "flex";
  legend.style.flexDirection = "column";
  legend.style.alignItems = "center";

  const legendColors = document.createElement("div");
  legendColors.id = `${legend.id}-colors`;
  legendColors.style.height = "80%";
  legendColors.style.width = LEGEND_WIDTH;
  legendColors.style.backgroundImage = `linear-gradient(${rgbArrayToString(
    colors.pos
  )}, white, ${rgbArrayToString(colors.neg)})`;

  legend.innerHTML += "<b><p>Max</p></b>";
  legend.append(
    document.createTextNode(
      `${flatMat ? customRound(Math.max(...flatMat), 2) : "-"}`
    )
  );
  legend.append(legendColors);
  legend.append(
    document.createTextNode(
      `${flatMat ? customRound(Math.min(...flatMat), 2) : "-"}`
    )
  );
  legend.innerHTML += "<b><p>Min</p></b>";

  document
    .getElementById(containerId.replace("#", ""))
    ?.getElementsByClassName(CANVAS_CONTAINER_CLASSNAME)[0]
    ?.appendChild(legend);
};
