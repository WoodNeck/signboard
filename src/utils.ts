import ERROR from "./constant/error";

// Initialize canvas element
export function createCanvas(el: HTMLElement | string): HTMLCanvasElement {
  let canvas: HTMLCanvasElement;
  let targetEl: HTMLElement;
  if (typeof el === "string") {
    const queryResult = document.querySelector(el);
    if (!queryResult) {
      throw new Error(ERROR.ELEMENT_NOT_FOUND(el));
    }
    targetEl = queryResult as HTMLElement;
  } else if (el.nodeName) {
    targetEl = el;
  } else {
    throw new Error(ERROR.TYPE_ALLOWED_ONLY([HTMLElement, String]));
  }

  if (targetEl.nodeName.toLowerCase() === "canvas") {
    // Given canvas
    canvas = targetEl as HTMLCanvasElement;
  } else {
    // Given wrapper
    canvas = document.createElement("canvas");

    // Set default styles
    canvas.width = targetEl.offsetWidth;
    canvas.height = targetEl.offsetHeight;
    canvas.style.bottom = "0";
    canvas.style.left = "0";
    canvas.style.right = "0";
    canvas.style.top = "0";
    canvas.style.margin = "auto";
    canvas.style.maxHeight = "100%";
    canvas.style.maxWidth = "100%";
    canvas.style.outline = "none";
    canvas.style.position = "absolute";

    targetEl.appendChild(canvas);
  }

  return canvas;
}

export function getGLContext(canvas: HTMLCanvasElement, attribs?: WebGLContextAttributes): WebGLRenderingContext {
  if (!window.WebGLRenderingContext) {
    throw new Error(ERROR.WEBGL_NOT_AVAILABLE);
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
    throw new Error(ERROR.WEBGL_NOT_AVAILABLE);
  }

  return context;
}

export function createProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string) {
  const program = gl.createProgram()!;
  const vs = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Link
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  // Cleanup
  gl.detachShader(program, vs);
  gl.detachShader(program, fs);
  gl.deleteShader(vs);
  gl.deleteShader(fs);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(ERROR.PROGRAM_LINK_FAILED(gl.getProgramInfoLog(program)!));
  }

  return program;
}

export function loadShader(
  gl: WebGLRenderingContext,
  type: WebGLRenderingContextBase["VERTEX_SHADER"] | WebGLRenderingContextBase["FRAGMENT_SHADER"],
  src: string,
): WebGLShader {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
  }
  return shader;
}
