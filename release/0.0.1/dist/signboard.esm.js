/*
Copyright (c) 2019 WoodNeck
name: signboard
license: MIT
author: WoodNeck
repository: git+https://github.com/WoodNeck/signboard.js.git
version: 0.0.1
*/
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}

var SignBoardError = function (_super) {
  __extends(SignBoardError, _super);

  function SignBoardError(message, code) {
    var _this = _super.call(this, "(signboard.js) " + message) || this;

    _this.message = message;
    _this.code = code;
    Object.setPrototypeOf(_this, SignBoardError.prototype);
    _this.name = "SignBoardError";
    return _this;
  }

  return SignBoardError;
}(Error);

var signboardVS = "#define GLSLIFY 1\nattribute vec4 aPosition;attribute vec2 aTexCoord;varying vec2 vTexCoord;void main(){gl_Position=aPosition;vTexCoord=aTexCoord;}"; // eslint-disable-line

var signboardFS = "precision highp float;\n#define GLSLIFY 1\nvarying vec2 vTexCoord;uniform float uInvTileSize;uniform vec2 uResolution;uniform float uEmission;uniform float uBulbSize;uniform sampler2D uTexture;float sstep(float edge0,float edge1,float x){x=clamp((x-edge0)/(edge1-edge0),0.0,1.0);return x*x*(3.0-2.0*x);}void main(){vec2 tilesPerSide=floor(uResolution*uInvTileSize);vec2 invTilesPerSide=1.0/tilesPerSide;vec2 tileCenter=floor(vTexCoord*tilesPerSide)*invTilesPerSide+invTilesPerSide*0.5;vec2 diffToCenter=vTexCoord-tileCenter;vec2 distToCenter=diffToCenter*diffToCenter*4.0*tilesPerSide*tilesPerSide;float dist=distToCenter.x+distToCenter.y;float dissipation=1.0-sstep(0.0,uBulbSize*uBulbSize,dist*dist);gl_FragColor=texture2D(uTexture,tileCenter)*dissipation*uEmission;}"; // eslint-disable-line

var POSITION = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
var TEX_COORD = new Float32Array([0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0]);

var CODE = {
  WRONG_TYPE: 0,
  ELEMENT_NOT_FOUND: 1,
  ELEMENT_NOT_CANVAS: 2,
  WEBGL_NOT_SUPPORTED: 3,
  FAILED_COMPILE_SHADER: 4,
  FAILED_COMPILE_PROGRAM: 5,
  FAILED_TO_LOAD_IMAGE: 6
};
var MESSAGE = {
  WRONG_TYPE: function (val, types) {
    return typeof val + " is not a " + types.map(function (type) {
      return "\"" + type + "\"";
    }).join(" or ") + ".";
  },
  ELEMENT_NOT_FOUND: function (query) {
    return "Element with selector \"" + query + "\" not found.";
  },
  ELEMENT_NOT_CANVAS: function (el) {
    return "Given element <" + el.tagName + "> is not a canvas.";
  },
  WEBGL_NOT_SUPPORTED: function (msg) {
    return "WebGL context creation failed with the following error - \"" + msg + "\"";
  },
  FAILED_COMPILE_SHADER: function (msg) {
    return "Failed compiling shader - \"" + msg + "\"";
  },
  FAILED_COMPILE_PROGRAM: function (msg) {
    return "Failed compiling WebGL program - \"" + msg + "\"";
  },
  FAILED_TO_LOAD_IMAGE: function (src) {
    return "Failed to load image with src - \"" + src + "\"";
  }
};

var BROWSER = {
  WEBGL_CONTEXT_CREATION_ERROR: "webglcontextcreationerror",
  LOAD: "load",
  ERROR: "error",
  RESIZE: "resize",
  READY_STATE_CHANGE: "readystatechange",
  CAN_PLAY_THROUGH: "canplaythrough",
  LOADED_DATA: "loadeddata"
};

function getElement(el) {
  var targetEl = null;

  if (typeof el === "string") {
    var queryResult = document.querySelector(el);

    if (!queryResult) {
      throw new SignBoardError(MESSAGE.ELEMENT_NOT_FOUND(el), CODE.ELEMENT_NOT_FOUND);
    }

    targetEl = queryResult;
  } else if (el && el.nodeType === Node.ELEMENT_NODE) {
    targetEl = el;
  }

  return targetEl;
}
var getCanvas = function (el) {
  var targetEl = getElement(el);

  if (!targetEl) {
    throw new SignBoardError(MESSAGE.WRONG_TYPE(el, ["HTMLElement", "string"]), CODE.WRONG_TYPE);
  }

  if (!/^canvas$/i.test(targetEl.tagName)) {
    throw new SignBoardError(MESSAGE.ELEMENT_NOT_CANVAS(targetEl), CODE.ELEMENT_NOT_CANVAS);
  }

  return targetEl;
};
var getWebGLContext = function (canvas) {
  var context = null;
  var reason = "";
  var contextAttributes = {};

  var onWebGLContextCreationError = function (e) {
    reason = e.statusMessage || "Unknown Error";
  };

  canvas.addEventListener(BROWSER.WEBGL_CONTEXT_CREATION_ERROR, onWebGLContextCreationError);
  context = canvas.getContext("webgl", contextAttributes);
  canvas.removeEventListener(BROWSER.WEBGL_CONTEXT_CREATION_ERROR, onWebGLContextCreationError);
  if (!context) throw new SignBoardError(MESSAGE.WEBGL_NOT_SUPPORTED(reason), CODE.WEBGL_NOT_SUPPORTED);
  canvas.addEventListener("webglcontextlost", function (e) {
    console.log("contextlost");
    e.preventDefault();
  }, false);
  return context;
};

var Renderer = function () {
  function Renderer(canvas, _a) {
    var _this = this;

    var frameRate = _a.frameRate,
        tileSize = _a.tileSize,
        emission = _a.emission,
        bulbSize = _a.bulbSize;

    this._onAnimationFrame = function (time) {
      var lastTime = _this._lastRenderTime;
      var timeDiff = time - lastTime;
      var updateInterval = 1000 / _this._frameRate;

      if (timeDiff >= updateInterval || lastTime < 0) {
        _this.render();

        _this._lastRenderTime = lastTime + updateInterval;
      }

      _this._animationID = requestAnimationFrame(_this._onAnimationFrame);
    };

    this._canvas = canvas;
    this._gl = getWebGLContext(canvas);
    this._program = null;
    this._texture = null;
    this._lastRenderTime = -1;
    this._animationID = -1;
    this._uniforms = {
      uInvTileSize: null,
      uResolution: null,
      uEmission: null,
      uBulbSize: null
    };
    this._frameRate = frameRate;
    this._tileSize = tileSize;
    this._emission = emission;
    this._bulbSize = bulbSize;
  }

  var __proto = Renderer.prototype;
  Object.defineProperty(__proto, "canvas", {
    get: function () {
      return this._canvas;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "gl", {
    get: function () {
      return this._gl;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "frameRate", {
    get: function () {
      return this._frameRate;
    },
    set: function (val) {
      this._frameRate = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "tileSize", {
    get: function () {
      return this._tileSize;
    },
    set: function (val) {
      this._tileSize = val;

      this._updateUniforms();

      this.render();
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "emission", {
    get: function () {
      return this._emission;
    },
    set: function (val) {
      this._emission = val;

      this._updateUniforms();

      this.render();
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "bulbSize", {
    get: function () {
      return this._bulbSize;
    },
    set: function (val) {
      this._bulbSize = val;

      this._updateUniforms();

      this.render();
    },
    enumerable: false,
    configurable: true
  });

  __proto.destroy = function () {
    this.stop();
    this._texture = null;

    this._gl.deleteProgram(this._program);
  };

  __proto.init = function () {
    var gl = this._gl;

    var program = this._createWebGLProgram();

    this._program = program;
    gl.useProgram(program);

    this._bindAttributes(program);

    this._bindUniforms(program);

    this._updateUniforms();
  };

  __proto.setTexture = function (texture) {
    texture.init(this._gl);
    this._texture = texture;
  };

  __proto.resize = function () {
    var canvas = this._canvas;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    this._updateUniforms();
  };

  __proto.start = function () {
    this._animationID = requestAnimationFrame(this._onAnimationFrame);
  };

  __proto.stop = function () {
    cancelAnimationFrame(this._animationID);
    this._animationID = -1;
    this._lastRenderTime = -1;
  };

  __proto.render = function () {
    var gl = this._gl;

    this._texture.upload(this._gl);

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.bindTexture(gl.TEXTURE_2D, null);
  };

  __proto._compileShader = function (src, type) {
    var gl = this._gl;
    var shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new SignBoardError(MESSAGE.FAILED_COMPILE_SHADER(gl.getShaderInfoLog(shader)), CODE.FAILED_COMPILE_SHADER);
    }

    return shader;
  };

  __proto._createWebGLProgram = function () {
    var gl = this._gl;
    var program = gl.createProgram();

    var vs = this._compileShader(signboardVS, gl.VERTEX_SHADER);

    var fs = this._compileShader(signboardFS, gl.FRAGMENT_SHADER);

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new SignBoardError(MESSAGE.FAILED_COMPILE_PROGRAM(gl.getProgramInfoLog(program)), CODE.FAILED_COMPILE_PROGRAM);
    }

    return program;
  };

  __proto._bindAttributes = function (program) {
    var gl = this._gl;
    var positionLocation = gl.getAttribLocation(program, "aPosition");
    var texcoordLocation = gl.getAttribLocation(program, "aTexCoord");
    var positionBuffer = gl.createBuffer();
    var texcoordBuffer = gl.createBuffer();
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, POSITION, gl.STATIC_DRAW);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(texcoordLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, TEX_COORD, gl.STATIC_DRAW);
    gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);
  };

  __proto._bindUniforms = function (program) {
    var gl = this._gl;
    this._uniforms = {
      uInvTileSize: gl.getUniformLocation(program, "uInvTileSize"),
      uResolution: gl.getUniformLocation(program, "uResolution"),
      uEmission: gl.getUniformLocation(program, "uEmission"),
      uBulbSize: gl.getUniformLocation(program, "uBulbSize")
    };
  };

  __proto._updateUniforms = function () {
    var gl = this._gl;
    var canvas = this._canvas;
    var uniforms = this._uniforms;
    if (!this._program) return;
    gl.uniform1f(uniforms.uInvTileSize, 1 / this._tileSize);
    gl.uniform2f(uniforms.uResolution, canvas.width, canvas.height);
    gl.uniform1f(uniforms.uEmission, this._emission);
    gl.uniform1f(uniforms.uBulbSize, this._bulbSize);
  };

  return Renderer;
}();

var CONTENT_TYPE = {
  IMAGE: "image",
  VIDEO: "video"
};

var ImageTexture = function () {
  function ImageTexture(image) {
    this._image = image;
    this._texture = null;
  }

  var __proto = ImageTexture.prototype;

  __proto.init = function (gl) {
    this._texture = gl.createTexture();
  };

  __proto.upload = function (gl) {
    gl.bindTexture(gl.TEXTURE_2D, this._texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._image);
  };

  return ImageTexture;
}();

var VideoTexture = function () {
  function VideoTexture(video) {
    this._video = video;
    this._texture = null;
  }

  var __proto = VideoTexture.prototype;

  __proto.init = function (gl) {
    this._texture = gl.createTexture();

    this._video.play();
  };

  __proto.upload = function (gl) {
    gl.bindTexture(gl.TEXTURE_2D, this._texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._video);
  };

  return VideoTexture;
}();

var TextureLoader = function () {
  function TextureLoader(src, type) {
    this._src = src;
    this._type = type;
  }

  var __proto = TextureLoader.prototype;

  __proto.load = function () {
    return __awaiter(this, void 0, Promise, function () {
      return __generator(this, function (_a) {
        switch (this._type) {
          case CONTENT_TYPE.IMAGE:
            return [2, this._loadImage()];

          case CONTENT_TYPE.VIDEO:
            return [2, this._loadVideo()];
        }

        return [2];
      });
    });
  };

  __proto._loadImage = function () {
    return __awaiter(this, void 0, Promise, function () {
      var image, src;
      return __generator(this, function (_a) {
        image = new Image();
        src = this._src;
        return [2, new Promise(function (resolve, reject) {
          image.addEventListener(BROWSER.LOAD, function () {
            resolve(new ImageTexture(image));
          });
          image.addEventListener(BROWSER.ERROR, function () {
            reject(new SignBoardError(MESSAGE.FAILED_TO_LOAD_IMAGE(src), CODE.FAILED_TO_LOAD_IMAGE));
          });
          image.crossOrigin = "anonymous";
          image.src = src;
        })];
      });
    });
  };

  __proto._loadVideo = function () {
    return __awaiter(this, void 0, Promise, function () {
      var video, src;
      return __generator(this, function (_a) {
        video = document.createElement("video");
        src = this._src;
        return [2, new Promise(function (resolve, reject) {
          video.addEventListener(BROWSER.LOADED_DATA, function () {
            resolve(new VideoTexture(video));
          });
          video.addEventListener(BROWSER.ERROR, function () {
            reject(new SignBoardError(MESSAGE.FAILED_TO_LOAD_IMAGE(src), CODE.FAILED_TO_LOAD_IMAGE));
          });
          video.loop = true;
          video.playsInline = true;
          video.crossOrigin = "anonymous";
          video.src = src;
          video.load();
        })];
      });
    });
  };

  return TextureLoader;
}();

var SignBoard = function () {
  function SignBoard(canvas, src, _a) {
    var _b = _a === void 0 ? {} : _a,
        _c = _b.contentType,
        contentType = _c === void 0 ? CONTENT_TYPE.IMAGE : _c,
        _d = _b.frameRate,
        frameRate = _d === void 0 ? 60 : _d,
        _e = _b.autoResize,
        autoResize = _e === void 0 ? true : _e,
        _f = _b.tileSize,
        tileSize = _f === void 0 ? 8 : _f,
        _g = _b.emission,
        emission = _g === void 0 ? 1 : _g,
        _h = _b.bulbSize,
        bulbSize = _h === void 0 ? 0.7 : _h;

    this._renderer = new Renderer(getCanvas(canvas), {
      frameRate: frameRate,
      tileSize: tileSize,
      emission: emission,
      bulbSize: bulbSize
    });
    this._src = src;
    this._initialized = false;
    this._contentType = contentType;
    this._autoResize = autoResize;
    this.resize = this.resize.bind(this);
    this.init();
  }

  var __proto = SignBoard.prototype;
  Object.defineProperty(__proto, "renderer", {
    get: function () {
      return this._renderer;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "src", {
    get: function () {
      return this._src;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "initialized", {
    get: function () {
      return this._initialized;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "contentType", {
    get: function () {
      return this._contentType;
    },
    set: function (val) {
      this._contentType = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "frameRate", {
    get: function () {
      return this._renderer.frameRate;
    },
    set: function (val) {
      this._renderer.frameRate = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "tileSize", {
    get: function () {
      return this._renderer.tileSize;
    },
    set: function (val) {
      this._renderer.tileSize = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "autoResize", {
    get: function () {
      return this._autoResize;
    },
    set: function (val) {
      this._updateAutoResize(val);
    },
    enumerable: false,
    configurable: true
  });

  __proto.init = function () {
    return __awaiter(this, void 0, void 0, function () {
      var renderer, textureLoader, texture;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            renderer = this._renderer;
            textureLoader = new TextureLoader(this._src, this._contentType);
            return [4, textureLoader.load()];

          case 1:
            texture = _a.sent();
            renderer.resize();
            renderer.init();
            renderer.setTexture(texture);

            if (this._contentType === CONTENT_TYPE.VIDEO) {
              renderer.start();
            } else {
              renderer.render();
            }

            if (this._autoResize) {
              this._autoResize = false;

              this._updateAutoResize(true);
            }

            this._initialized = true;
            return [2];
        }
      });
    });
  };

  __proto.resize = function () {
    var renderer = this._renderer;
    renderer.resize();
    renderer.render();
  };

  __proto._updateAutoResize = function (newVal) {
    var prevVal = this._autoResize;
    if (prevVal === newVal) return;

    if (newVal) {
      window.addEventListener(BROWSER.RESIZE, this.resize);
    } else {
      window.removeEventListener(BROWSER.RESIZE, this.resize);
    }

    this._autoResize = newVal;
  };

  return SignBoard;
}();

export default SignBoard;
export { CONTENT_TYPE, CODE as ERROR_CODE, ImageTexture, Renderer, SignBoardError, TextureLoader, VideoTexture };
//# sourceMappingURL=signboard.esm.js.map
