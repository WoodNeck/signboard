import SignBoardError from "./core/SignBoardError";
import * as EVENT from "./const/event";
import * as ERROR from "./const/error";
import { Merged } from "./types";

export function getElement(el: HTMLElement | string | null): HTMLElement | null {
  let targetEl: HTMLElement | null = null;

  if (typeof el === "string") {
    const queryResult = document.querySelector(el);
    if (!queryResult) {
      throw new SignBoardError(ERROR.MESSAGES.ELEMENT_NOT_FOUND(el), ERROR.CODES.ELEMENT_NOT_FOUND);
    }
    targetEl = queryResult as HTMLElement;
  } else if (el && el.nodeType === Node.ELEMENT_NODE) {
    targetEl = el;
  }

  return targetEl;
}

export const getCanvas = (el: HTMLElement | string): HTMLCanvasElement => {
  const targetEl = getElement(el);

  if (!targetEl) {
    throw new SignBoardError(ERROR.MESSAGES.WRONG_TYPE(el, ["HTMLElement", "string"]), ERROR.CODES.WRONG_TYPE);
  }

  if (!/^canvas$/i.test(targetEl.tagName)) {
    throw new SignBoardError(ERROR.MESSAGES.ELEMENT_NOT_CANVAS(targetEl), ERROR.CODES.ELEMENT_NOT_CANVAS);
  }

  return targetEl as HTMLCanvasElement;
}

export const getWebGLContext = (canvas: HTMLCanvasElement): WebGLRenderingContext => {
  let context: WebGLRenderingContext | null = null;
  let reason: string = "";
  const contextAttributes: WebGLContextAttributes = {};

  const onWebGLContextCreationError = (e: Event) => {
    reason = (e as WebGLContextEvent).statusMessage || "Unknown Error";
  }

  canvas.addEventListener(EVENT.BROWSER.WEBGL_CONTEXT_CREATION_ERROR, onWebGLContextCreationError);
  context = canvas.getContext("webgl", contextAttributes) as WebGLRenderingContext;
  canvas.removeEventListener(EVENT.BROWSER.WEBGL_CONTEXT_CREATION_ERROR, onWebGLContextCreationError);

  if (!context) throw new SignBoardError(ERROR.MESSAGES.WEBGL_NOT_SUPPORTED(reason), ERROR.CODES.WEBGL_NOT_SUPPORTED);

  canvas.addEventListener("webglcontextlost", e => {
    console.log("contextlost");
    e.preventDefault();
  }, false);

  return context;
}

export const merge = <From extends {[key: string]: any}, To extends {[key: string]: any}>(target: From, ...sources: To[]): Merged<From, To> => {
  sources.forEach(source => {
    Object.keys(source).forEach(key => {
      (target as any)[key] = source[key];
    });
  });

  return target as Merged<From, To>;
};
