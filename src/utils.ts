import { ELEMENT_NOT_FOUND, TYPE_ALLOWED_ONLY, WEBGL_NOT_AVAILABLE } from "./constant/errors";

// Initialize canvas element
export function createCanvas(el: HTMLElement | string): HTMLCanvasElement {
  let canvas: HTMLCanvasElement;
  let targetEl: HTMLElement;
  if (typeof el === "string") {
    const queryResult = document.querySelector(el);
    if (!queryResult) {
      throw new Error(ELEMENT_NOT_FOUND(el));
    }
    targetEl = queryResult as HTMLElement;
  } else if (el.nodeName) {
    targetEl = el;
  } else {
    throw new Error(TYPE_ALLOWED_ONLY([HTMLElement, String]));
  }

  if (targetEl.nodeName.toLowerCase() === "canvas") {
    // Given canvas
    canvas = targetEl as HTMLCanvasElement;
  } else {
    // Given wrapper
    canvas = document.createElement("canvas");
    targetEl.appendChild(canvas);
  }
  return canvas;
}

export function getGLContext(canvas: HTMLCanvasElement, attribs?: WebGLContextAttributes): WebGLRenderingContext {
  if (!window.WebGLRenderingContext) {
    throw new Error(WEBGL_NOT_AVAILABLE);
  }

  const webglIdentifiers = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];

  const defaultAttribs = {
    preserveDrawingBuffer: false,
    antialias: false,
  };

  const contextAttributes = Object.assign(defaultAttribs, attribs);

  function onWebglcontextcreationerror(e: any) {
    return e.statusMessage;
  }

  canvas.addEventListener("webglcontextcreationerror", onWebglcontextcreationerror);

  let context: WebGLRenderingContext | null = null;
  for (const identifier of webglIdentifiers) {
    try {
      context = canvas.getContext(identifier, contextAttributes) as WebGLRenderingContext;
    } catch (t) {
      // DO NOTHING
    }
    if (context) {
      break;
    }
  }

  canvas.removeEventListener("webglcontextcreationerror", onWebglcontextcreationerror);

  if (!context) {
    throw new Error(WEBGL_NOT_AVAILABLE);
  }

  return context;
}
