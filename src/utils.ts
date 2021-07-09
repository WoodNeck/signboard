import SignBoardError from "./core/SignBoardError";
import * as EVENT from "./const/event";
import * as ERROR from "./const/error";
import { Merged, ValueOf } from "./types";
import { CONTENT_TYPE, OBJECT_FIT } from "./const/options";

export function getElement(el: HTMLElement | string | null): HTMLElement | null {
  let targetEl: HTMLElement | null = null;

  if (typeof el === "string") {
    const queryResult = document.querySelector(el);
    if (!queryResult) {
      throw new SignBoardError(ERROR.MESSAGE.ELEMENT_NOT_FOUND(el), ERROR.CODE.ELEMENT_NOT_FOUND);
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
    throw new SignBoardError(ERROR.MESSAGE.WRONG_TYPE(el, ["HTMLElement", "string"]), ERROR.CODE.WRONG_TYPE);
  }

  if (!/^canvas$/i.test(targetEl.tagName)) {
    throw new SignBoardError(ERROR.MESSAGE.ELEMENT_NOT_CANVAS(targetEl), ERROR.CODE.ELEMENT_NOT_CANVAS);
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
  context = canvas.getContext("webgl", contextAttributes) || canvas.getContext("experimental-webgl") as WebGLRenderingContext;
  canvas.removeEventListener(EVENT.BROWSER.WEBGL_CONTEXT_CREATION_ERROR, onWebGLContextCreationError);

  if (!context) throw new SignBoardError(ERROR.MESSAGE.WEBGL_NOT_SUPPORTED(reason), ERROR.CODE.WEBGL_NOT_SUPPORTED);

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

export const clamp = (x: number, min: number, max: number) => Math.max(Math.min(x, max), min);

export const getSubImage = (
  contentSize: { width: number; height: number },
  renderingSize: { width: number; height: number },
  objectFit: ValueOf<typeof OBJECT_FIT>,
  contentType: ValueOf<typeof CONTENT_TYPE>
): { x: number; y: number; width: number; height: number } => {
  switch (objectFit) {
    case OBJECT_FIT.FILL: {
      return { x: 0, y: 0, ...renderingSize }
    }
    case OBJECT_FIT.CONTAIN: {
      const xScale = renderingSize.width / contentSize.width;
      const yScale = renderingSize.height / contentSize.height;

      if (xScale >= yScale) {
        const newWidth = contentSize.width * yScale
        return { x: (renderingSize.width - newWidth) / 2, y: 0, width: newWidth, height: renderingSize.height };
      } else {
        const newHeight = contentSize.height * xScale;
        return { x: 0, y: (renderingSize.height - newHeight) / 2, width: renderingSize.width, height: newHeight };
      }
    }
    case OBJECT_FIT.COVER: {
      const xScale = renderingSize.width / contentSize.width;
      const yScale = renderingSize.height / contentSize.height;

      if (xScale >= yScale) {
        const newHeight = contentSize.height * xScale;
        return { x: 0, y: (renderingSize.height - newHeight) / 2, width: renderingSize.width, height: newHeight };
      } else {
        const newWidth = contentSize.width * yScale
        const xOffset = contentType === CONTENT_TYPE.TEXT
          ? 0
          : (renderingSize.width - newWidth) / 2;

        return { x: xOffset, y: 0, width: newWidth, height: renderingSize.height };
      }
    }
    case OBJECT_FIT.NONE: {
      return { x: (renderingSize.width - contentSize.width) / 2, y: (renderingSize.height - contentSize.height) / 2, ...contentSize };
    }
    case OBJECT_FIT.SCALE_DOWN: {
      if (contentSize.width > renderingSize.width || contentSize.height > renderingSize.height) {
        return getSubImage(contentSize, renderingSize, OBJECT_FIT.CONTAIN, contentType);
      } else {
        return getSubImage(contentSize, renderingSize, OBJECT_FIT.NONE, contentType);
      }
    }
    default:
      throw new SignBoardError(
        ERROR.MESSAGE.WRONG_OPTION(objectFit, "objectFit", Object.keys(OBJECT_FIT).map(key => OBJECT_FIT[key as keyof typeof OBJECT_FIT])),
        ERROR.CODE.WRONG_OPTION
      )
  }
}

export const parsePadding = (padding: number | number[]) => {
  if (!Array.isArray(padding)) {
    return [padding, padding, padding, padding];
  } else if (padding.length === 2) {
    return [padding[0], padding[1], padding[0], padding[1]];
  } else if (padding.length === 4) {
    return padding;
  } else {
    throw new SignBoardError(
      ERROR.MESSAGE.WRONG_OPTION(padding, "textPadding", ["number", "[number, number]", "[number, number, number, number]"]),
      ERROR.CODE.WRONG_OPTION
    )
  }
}
