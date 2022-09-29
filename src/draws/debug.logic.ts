import { Regl } from "regl";
import { NamespacedStore } from "../state/store/store";
import { WEBGL } from "./draw.const";

type DebugLineGetter = (...props: any[]) => {
  color: number[];
  tris: {
    pos: number[][];
  }[];
};

const getPixels = (regl: Regl, width: number) => {
  const canvas = regl._gl.canvas;
  return { x: width / canvas.width / 2, y: width / canvas.height / 2 };
};

const getCanvasSideLine = (x: number, side: "LEFT" | "RIGHT") => {
  const shift = WEBGL.X[side] * -1 * x;
  const sideX = WEBGL.X[side];
  return [
    {
      pos: [
        [sideX, WEBGL.Y.TOP],
        [sideX, WEBGL.Y.BOTTOM],
        [sideX + shift, WEBGL.Y.BOTTOM],
      ],
    },
    {
      pos: [
        [sideX, WEBGL.Y.TOP],
        [sideX + shift, WEBGL.Y.TOP],
        [sideX + shift, WEBGL.Y.BOTTOM],
      ],
    },
  ];
};

const getCanvasTopBottomLine = (y: number, direction: "TOP" | "BOTTOM") => {
  const shift = WEBGL.Y[direction] * -1 * y;
  const sideY = WEBGL.Y[direction];
  return [
    {
      pos: [
        [WEBGL.X.LEFT, sideY],
        [WEBGL.X.RIGHT, sideY],
        [WEBGL.X.RIGHT, sideY + shift],
      ],
    },
    {
      pos: [
        [WEBGL.X.LEFT, sideY],
        [WEBGL.X.LEFT, sideY + shift],
        [WEBGL.X.RIGHT, sideY + shift],
      ],
    },
  ];
};

export const getCanvasDebugLineTris: DebugLineGetter = (
  regl: Regl,
  lineWidth: number
) => {
  const { x, y } = getPixels(regl, lineWidth);
  return {
    color: [0, 0, 0, 1],
    tris: [
      // left side line
      ...getCanvasSideLine(x, "LEFT"),
      // right side line
      ...getCanvasSideLine(x, "RIGHT"),
      // top line
      ...getCanvasTopBottomLine(y, "TOP"),
      // bottom line
      ...getCanvasTopBottomLine(y, "BOTTOM"),
    ],
  };
};

const getMatSideLine = (
  store: NamespacedStore,
  x: number,
  side: "LEFT" | "RIGHT",
  shouldShift = false,
  heatOrMat: "mat_size" | "heat_size" = "mat_size"
) => {
  const { viz_dim } = store.select("visualization");
  const { offcenter } = viz_dim;
  const xOffset = shouldShift ? offcenter.x : 0;
  const yOffset = shouldShift ? offcenter.y : 0;
  const shift = WEBGL.X[side] * -1 * x;
  const xWidth = WEBGL.X[side] * viz_dim[heatOrMat].x + xOffset;
  const yWidth = viz_dim[heatOrMat].y;
  return [
    {
      pos: [
        [xWidth, yWidth - yOffset],
        [xWidth, -yWidth - yOffset],
        [xWidth + shift, -yWidth - yOffset],
      ],
    },
    {
      pos: [
        [xWidth, yWidth - yOffset],
        [xWidth + shift, yWidth - yOffset],
        [xWidth + shift, -yWidth - yOffset],
      ],
    },
  ];
};

const getMatTopBottomLine = (
  store: NamespacedStore,
  y: number,
  direction: "TOP" | "BOTTOM",
  shouldShift = false,
  heatOrMat: "mat_size" | "heat_size" = "mat_size"
) => {
  const { viz_dim } = store.select("visualization");
  const { offcenter } = viz_dim;
  const xOffset = shouldShift ? offcenter.x : 0;
  const yOffset = shouldShift ? offcenter.y : 0;
  const shift = WEBGL.Y[direction] * -1 * y;
  const yWidth = WEBGL.Y[direction] * viz_dim[heatOrMat].y - yOffset;
  const xWidth = viz_dim[heatOrMat].x;
  return [
    {
      pos: [
        [-xWidth + xOffset, yWidth],
        [xWidth + xOffset, yWidth],
        [xWidth + xOffset, yWidth + shift],
      ],
    },
    {
      pos: [
        [-xWidth + xOffset, yWidth],
        [-xWidth + xOffset, yWidth + shift],
        [xWidth + xOffset, yWidth + shift],
      ],
    },
  ];
};

export const getMatDebugLineTris: DebugLineGetter = (
  store: NamespacedStore,
  regl: Regl,
  lineWidth: number
) => {
  const { x, y } = getPixels(regl, lineWidth);
  return {
    color: [0, 0, 1, 1],
    tris: [
      // left side line
      ...getMatSideLine(store, x, "LEFT"),
      // right side line
      ...getMatSideLine(store, x, "RIGHT"),
      // top line
      ...getMatTopBottomLine(store, y, "TOP"),
      // bottom line
      ...getMatTopBottomLine(store, y, "BOTTOM"),
    ],
  };
};

export const getOffsetMatDebugLineTris: DebugLineGetter = (
  store: NamespacedStore,
  regl: Regl,
  lineWidth: number
) => {
  const { x, y } = getPixels(regl, lineWidth);
  return {
    color: [0.8, 0, 1, 1],
    tris: [
      // left side line
      ...getMatSideLine(store, x, "LEFT", true),
      // right side line
      ...getMatSideLine(store, x, "RIGHT", true),
      // top line
      ...getMatTopBottomLine(store, y, "TOP", true),
      // bottom line
      ...getMatTopBottomLine(store, y, "BOTTOM", true),
    ],
  };
};

export const getOffsetHeatDebugLineTris: DebugLineGetter = (
  store: NamespacedStore,
  regl: Regl,
  lineWidth: number
) => {
  const { x, y } = getPixels(regl, lineWidth);
  return {
    color: [1, 1, 0.4, 1],
    tris: [
      // left side line
      ...getMatSideLine(store, x, "LEFT", true, "heat_size"),
      // right side line
      ...getMatSideLine(store, x, "RIGHT", true, "heat_size"),
      // top line
      ...getMatTopBottomLine(store, y, "TOP", true, "heat_size"),
      // bottom line
      ...getMatTopBottomLine(store, y, "BOTTOM", true, "heat_size"),
    ],
  };
};
