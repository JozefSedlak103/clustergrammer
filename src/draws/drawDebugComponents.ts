import REGL, { Regl } from "regl";
import { Cameras } from "../cameras/cameras";
import { NamespacedStore } from "../state/store/store";
import { DEBUG_LINE_WIDTH } from "./debug.const";
import {
  getCanvasDebugLineTris,
  getMatDebugLineTris,
  getOffsetHeatDebugLineTris,
  getOffsetMatDebugLineTris,
} from "./debug.logic";

const makeDebugArgs = (regl: Regl, color: number[]): REGL.DrawConfig => ({
  // In a draw call, we can pass the shader source code to regl
  frag: `
          precision mediump float;
          uniform vec4 color;
          void main () {
            gl_FragColor = color;
          }`,
  vert: `
          precision mediump float;
          attribute vec2 position;
          void main () {
            // depth = 0, i.e. above/closer than anything else hopefully
            gl_Position = vec4(position, 0, 1);
          }`,
  attributes: {
    position: regl.prop("pos" as never),
  },
  uniforms: {
    color,
  },
  blend: {
    enable: true,
    func: {
      srcRGB: "src alpha",
      srcAlpha: 1,
      dstRGB: "one minus src alpha",
      dstAlpha: 1,
    },
    equation: {
      rgb: "add",
      alpha: "add",
    },
    color: [0, 0, 0, 0],
  },
  count: 3,
  depth: {
    enable: true,
    mask: true,
    func: "less",
    range: [0, 1],
  },
});

const makeDebugTris = (regl: Regl, store: NamespacedStore) => {
  return [
    getCanvasDebugLineTris(regl, DEBUG_LINE_WIDTH),
    getMatDebugLineTris(store, regl, DEBUG_LINE_WIDTH),
    getOffsetMatDebugLineTris(store, regl, DEBUG_LINE_WIDTH),
    getOffsetHeatDebugLineTris(store, regl, DEBUG_LINE_WIDTH),
  ];
};

export const drawDebugComponents = (
  regl: Regl,
  store: NamespacedStore,
  cameras: Cameras
) => {
  cameras.static.draw(() => {
    // viz aid triangles
    const debugTris = makeDebugTris(regl, store);
    debugTris.forEach(({ tris, color }) => {
      regl(makeDebugArgs(regl, color) as unknown as REGL.DrawConfig)(tris);
    });
  });
};
