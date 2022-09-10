import { computePosition, flip, offset, shift } from "@floating-ui/dom";
import { select } from "d3-selection";
import { CANVAS_CONTAINER_CLASSNAME } from "../../ui.const";

export const TOOLTIP_ID = "cg-tooltip";

export const hideTooltip = () => {
  const tooltip = document.getElementById(TOOLTIP_ID);
  if (tooltip) {
    Object.assign(tooltip.style, {
      display: "none",
    });
  }
};

const showTooltip = ({
  clientX,
  clientY,
}: {
  clientX: number;
  clientY: number;
}) => {
  const tooltip = document.getElementById(TOOLTIP_ID);
  if (tooltip) {
    const virtualEl = {
      getBoundingClientRect() {
        return {
          width: 0,
          height: 0,
          x: clientX,
          y: clientY,
          left: clientX,
          right: clientX,
          top: clientY,
          bottom: clientY,
        };
      },
    };

    computePosition(virtualEl, tooltip, {
      placement: "top",
      middleware: [offset(10), flip(), shift()],
    }).then(({ x, y }) => {
      Object.assign(tooltip.style, {
        display: "block",
        top: `${y}px`,
        left: `${x}px`,
      });
    });
  }
};

export default function ini_canvas_mouseover(
  store: NamespacedStore,
  container: any
) {
  select(container)
    .select(`.${CANVAS_CONTAINER_CLASSNAME}`)
    .append("div")
    .attr("id", TOOLTIP_ID);

  const tooltip = document.getElementById(TOOLTIP_ID);
  if (tooltip) {
    Object.assign(tooltip.style, {
      position: "absolute",
      background: "gray",
      padding: "0.5rem",
      color: "white",
      "box-sizing": "border-box",
      display: "none",
      "pointer-events": "none",
    });
  }

  const canvas = document.getElementsByTagName("canvas")?.[0];

  canvas.addEventListener("mousemove", (e) => {
    const state = store.selectAll();

    // show a tooltip if we're on a matrix cell
    const tooltip = document.getElementById(TOOLTIP_ID);
    if (
      tooltip &&
      store.select("tooltip").show_tooltip &&
      !store.select("tooltip").disable_tooltip
    ) {
      if (
        store.select("tooltip").tooltip_type &&
        store.select("tooltip").tooltip_type !== "out-of-bounds" &&
        store
          .select("tooltip")
          .enabledTooltips.some((x) =>
            store.select("tooltip").tooltip_type?.includes(x)
          )
      ) {
        if (tooltip.textContent != store.select("tooltip").text) {
          tooltip.textContent = store.select("tooltip").text;
        }
        showTooltip(e);
      } else {
        hideTooltip();
      }
    }
  });
  canvas.addEventListener("mouseleave", () => {
    store.dispatch(store.actions.mutateTooltipState({ show_tooltip: false }));
    hideTooltip();
  });
  canvas.addEventListener("mouseenter", () => {
    store.dispatch(store.actions.mutateTooltipState({ show_tooltip: true }));
    hideTooltip();
  });
}
