/*
Copyright (c) 2019 WoodNeck
name: signboard
license: MIT
author: WoodNeck
repository: git+https://github.com/WoodNeck/signboard.git
version: 1.0.1
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.SignBoard = factory());
}(this, (function () { 'use strict';

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
        for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      };

      return extendStatics(d, b);
    };

    function __extends(d, b) {
      if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
      __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }

        return t;
      };

      return __assign.apply(this, arguments);
    };
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

    /**
     * Special type of known error that {@link SignBoard} throws.
     * @property {number} code Error code
     * @property {string} message Error message
     * @see {@link ERROR_CODE ERROR_CODE}
     */

    var SignBoardError =
    /*#__PURE__*/
    function (_super) {
      __extends(SignBoardError, _super);
      /**
       * @param message Error message
       * @param code Error code
       */


      function SignBoardError(message, code) {
        var _this = _super.call(this, "(signboard.js) " + message) || this;

        Object.setPrototypeOf(_this, SignBoardError.prototype);
        _this.name = "SignBoardError";
        _this.code = code;
        return _this;
      }

      return SignBoardError;
    }(Error);

    var signboardVS = "#define GLSLIFY 1\nattribute vec4 aPosition;attribute vec2 aTexCoord;varying vec2 vTexCoord;void main(){gl_Position=aPosition;vTexCoord=aTexCoord;}"; // eslint-disable-line

    var signboardFS = "precision highp float;\n#define GLSLIFY 1\nvarying vec2 vTexCoord;uniform float uInvTileSize;uniform vec2 uResolution;uniform float uEmission;uniform float uDissipation;uniform float uBulbSize;uniform vec2 uTexOffset;uniform vec2 uTexScale;uniform float uScrollOffset;uniform sampler2D uTexture;float sstep(float edge0,float edge1,float x){x=clamp((x-edge0)/(edge1-edge0),0.0,1.0);return x*x*(3.0-2.0*x);}float circulate(float x,vec2 range){float diff=range[1]-range[0];float maxOffset=mod((x-range[1]),diff);float minOffset=mod((range[0]-x),diff);float ltMin=step(x,range[0]);float gtMax=step(range[1],x);return ltMin*(range[1]-minOffset)+gtMax*(range[0]+maxOffset)+(1.0-ltMin)*(1.0-gtMax)*x;}void main(){vec2 tilesPerSide=floor(uResolution*uInvTileSize);vec2 invTilesPerSide=1.0/tilesPerSide;vec2 tileCenter=floor(vTexCoord*tilesPerSide)*invTilesPerSide+invTilesPerSide*0.5;vec2 diffToCenter=vTexCoord-tileCenter;vec2 distToCenter=diffToCenter*diffToCenter*4.0*tilesPerSide*tilesPerSide;float dist=distToCenter.x+distToCenter.y;float dissipation=1.0-sstep(0.0,pow(uBulbSize,uDissipation),pow(dist,uDissipation));vec2 scrollOffset=vec2(floor(uScrollOffset*tilesPerSide[0])*invTilesPerSide[0],0.0);float invTexScaleHalf=max(uTexScale.x*0.5,0.5);vec2 origTexRange=vec2(0.5-invTexScaleHalf,0.5+invTexScaleHalf);vec2 texUV=(tileCenter-uTexOffset+scrollOffset)*uTexScale;texUV.x=circulate(texUV.x,origTexRange);vec2 inBorderUV=step(vec2(0.0),texUV)*step(texUV,vec2(1.0));float inBorder=step(2.0,inBorderUV.x+inBorderUV.y);gl_FragColor=texture2D(uTexture,texUV)*dissipation*uEmission*inBorder;}"; // eslint-disable-line

    var POSITION = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    var TEX_COORD = new Float32Array([0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0]);

    /**
     * Error codes of {@link SignBoardError}
     * @name ERROR_CODE
     * @constant
     * @type {object}
     * @property {number} WRONG_TYPE 0
     * @property {number} WRONG_OPTION 1
     * @property {number} ELEMENT_NOT_FOUND 2
     * @property {number} CANVAS_NOT_FOUND 3
     * @property {number} WEBGL_NOT_SUPPORTED 4
     * @property {number} FAILED_COMPILE_SHADER 5
     * @property {number} FAILED_COMPILE_PROGRAM 6
     * @property {number} FAILED_TO_LOAD_IMAGE 7
     * @property {number} TEXTURE_NOT_INITIALIZED 8
     */
    var CODE = {
      WRONG_TYPE: 0,
      WRONG_OPTION: 1,
      ELEMENT_NOT_FOUND: 2,
      ELEMENT_NOT_CANVAS: 3,
      WEBGL_NOT_SUPPORTED: 4,
      FAILED_COMPILE_SHADER: 5,
      FAILED_COMPILE_PROGRAM: 6,
      FAILED_TO_LOAD_IMAGE: 7,
      TEXTURE_NOT_INITIALIZED: 8
    };
    var MESSAGE = {
      WRONG_TYPE: function (val, types) {
        return val + "(" + typeof val + ") is not a " + types.map(function (type) {
          return "\"" + type + "\"";
        }).join(" or ") + ".";
      },
      WRONG_OPTION: function (val, optionName, possible) {
        return "Given value(" + val + ", " + typeof val + ") can't be used for option \"" + optionName + "\". Possible values are: " + possible.join(", ");
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
      },
      TEXTURE_NOT_INITIALIZED: "Texture is not initialized yet"
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

    /**
     * A constant for the {@link SignBoard#contentType contentType} option
     * @type {object}
     * @property {string} IMAGE "image"
     * @property {string} VIDEO "video"
     * @property {string} TEXT "text"
     * @example
     * ```ts
     * import { CONTENT_TYPE } from "signboard";
     * ```
     */
    var CONTENT_TYPE = {
      IMAGE: "image",
      VIDEO: "video",
      TEXT: "text"
    };
    /**
     * A constant for the {@link SignBoard#objectFit objectFit} option
     * @type {object}
     * @property {string} FILL "fill"
     * @property {string} CONTAIN "contain"
     * @property {string} COVER "cover"
     * @property {string} NONE "none"
     * @property {string} SCALE_DOWN "scale-down"
     * @example
     * ```ts
     * import { OBJECT_FIT } from "signboard";
     * ```
     */

    var OBJECT_FIT = {
      FILL: "fill",
      CONTAIN: "contain",
      COVER: "cover",
      NONE: "none",
      SCALE_DOWN: "scale-down"
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
      context = canvas.getContext("webgl", contextAttributes) || canvas.getContext("experimental-webgl");
      canvas.removeEventListener(BROWSER.WEBGL_CONTEXT_CREATION_ERROR, onWebGLContextCreationError);
      if (!context) throw new SignBoardError(MESSAGE.WEBGL_NOT_SUPPORTED(reason), CODE.WEBGL_NOT_SUPPORTED);
      canvas.addEventListener("webglcontextlost", function (e) {
        e.preventDefault();
      }, false);
      return context;
    };
    var merge = function (target) {
      var sources = [];

      for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
      }

      sources.forEach(function (source) {
        Object.keys(source).forEach(function (key) {
          target[key] = source[key];
        });
      });
      return target;
    };
    var getSubImage = function (contentSize, renderingSize, objectFit, contentType) {
      switch (objectFit) {
        case OBJECT_FIT.FILL:
          {
            return __assign({
              x: 0,
              y: 0
            }, renderingSize);
          }

        case OBJECT_FIT.CONTAIN:
          {
            var xScale = renderingSize.width / contentSize.width;
            var yScale = renderingSize.height / contentSize.height;

            if (xScale >= yScale) {
              var newWidth = contentSize.width * yScale;
              return {
                x: (renderingSize.width - newWidth) / 2,
                y: 0,
                width: newWidth,
                height: renderingSize.height
              };
            } else {
              var newHeight = contentSize.height * xScale;
              return {
                x: 0,
                y: (renderingSize.height - newHeight) / 2,
                width: renderingSize.width,
                height: newHeight
              };
            }
          }

        case OBJECT_FIT.COVER:
          {
            var xScale = renderingSize.width / contentSize.width;
            var yScale = renderingSize.height / contentSize.height;

            if (xScale >= yScale) {
              var newHeight = contentSize.height * xScale;
              return {
                x: 0,
                y: (renderingSize.height - newHeight) / 2,
                width: renderingSize.width,
                height: newHeight
              };
            } else {
              var newWidth = contentSize.width * yScale;
              var xOffset = contentType === CONTENT_TYPE.TEXT ? 0 : (renderingSize.width - newWidth) / 2;
              return {
                x: xOffset,
                y: 0,
                width: newWidth,
                height: renderingSize.height
              };
            }
          }

        case OBJECT_FIT.NONE:
          {
            return __assign({
              x: (renderingSize.width - contentSize.width) / 2,
              y: (renderingSize.height - contentSize.height) / 2
            }, contentSize);
          }

        case OBJECT_FIT.SCALE_DOWN:
          {
            if (contentSize.width > renderingSize.width || contentSize.height > renderingSize.height) {
              return getSubImage(contentSize, renderingSize, OBJECT_FIT.CONTAIN, contentType);
            } else {
              return getSubImage(contentSize, renderingSize, OBJECT_FIT.NONE, contentType);
            }
          }

        default:
          throw new SignBoardError(MESSAGE.WRONG_OPTION(objectFit, "objectFit", Object.keys(OBJECT_FIT).map(function (key) {
            return OBJECT_FIT[key];
          })), CODE.WRONG_OPTION);
      }
    };
    var parsePadding = function (padding) {
      if (!Array.isArray(padding)) {
        return [padding, padding, padding, padding];
      } else if (padding.length === 2) {
        return [padding[0], padding[1], padding[0], padding[1]];
      } else if (padding.length === 4) {
        return padding;
      } else {
        throw new SignBoardError(MESSAGE.WRONG_OPTION(padding, "textPadding", ["number", "[number, number]", "[number, number, number, number]"]), CODE.WRONG_OPTION);
      }
    };

    var Renderer =
    /*#__PURE__*/
    function () {
      function Renderer(canvas, signboard) {
        var _this = this;

        this._onAnimationFrame = function (time) {
          var signboard = _this._signboard;
          var lastTime = _this._lastRenderTime;
          var delta = time - lastTime;
          var updateInterval = 1000 / signboard.frameRate;

          if (delta >= updateInterval || lastTime < 0) {
            _this._increaseScrollOffset();

            _this.render();

            _this._lastRenderTime = lastTime + updateInterval;
          }

          _this._animationID = requestAnimationFrame(_this._onAnimationFrame);
        };

        this._signboard = signboard;
        this._canvas = canvas;
        this._gl = getWebGLContext(canvas);
        this._program = null;
        this._texture = null;
        this._lastRenderTime = -1;
        this._animationID = -1;
        this._prevScroll = 0;
        this._buffers = {
          position: null,
          texcoord: null
        };
        this._uniforms = {
          uInvTileSize: null,
          uResolution: null,
          uEmission: null,
          uDissipation: null,
          uBulbSize: null,
          uTexOffset: null,
          uTexScale: null,
          uScrollOffset: null
        };
        this._contextLost = false;
      }

      var __proto = Renderer.prototype;
      Object.defineProperty(__proto, "animating", {
        get: function () {
          return this._animationID >= 0;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "canvas", {
        // Options
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

      __proto.destroy = function () {
        var _a, _b;

        this.stop();
        var gl = this._gl;
        var texture = (_a = this._texture) === null || _a === void 0 ? void 0 : _a.webGLTexture;
        gl.deleteProgram(this._program);
        gl.deleteBuffer(this._buffers.position);
        gl.deleteBuffer(this._buffers.texcoord);

        if (texture) {
          gl.deleteTexture(texture);
        }

        (_b = gl.getExtension("WEBGL_lose_context")) === null || _b === void 0 ? void 0 : _b.loseContext();
        this._texture = null;
        this._contextLost = true;
      };

      __proto.init = function () {
        if (this._contextLost) return;
        var gl = this._gl;

        var program = this._createWebGLProgram();

        this._program = program;
        gl.useProgram(program);

        this._bindAttributes(program);

        this._bindUniforms(program);

        this.updateUniforms();
      };

      __proto.setTexture = function (texture) {
        texture.init(this._gl);
        this._texture = texture;
        this.updateTextureOffset();
      };

      __proto.resize = function () {
        var canvas = this._canvas;
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        this.updateUniforms();
      };
      /**
       */


      __proto.start = function () {
        this._animationID = requestAnimationFrame(this._onAnimationFrame);
      };
      /**
       * Stop animation
       */


      __proto.stop = function () {
        cancelAnimationFrame(this._animationID);
        this._animationID = -1;
        this._lastRenderTime = -1;
      };
      /**
       * Render a single frame
       */


      __proto.render = function () {
        var gl = this._gl;
        var texture = this._texture;
        if (!this._signboard.initialized) return;

        if (!texture) {
          throw new SignBoardError(MESSAGE.TEXTURE_NOT_INITIALIZED, CODE.TEXTURE_NOT_INITIALIZED);
        }

        texture.upload(this._gl);
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        gl.bindTexture(gl.TEXTURE_2D, null);
      };

      __proto.updateUniforms = function () {
        var signboard = this._signboard;
        var gl = this._gl;
        var canvas = this._canvas;
        var uniforms = this._uniforms;
        if (!this._program) return;
        gl.uniform1f(uniforms.uInvTileSize, 1 / signboard.tileSize);
        gl.uniform2f(uniforms.uResolution, canvas.width, canvas.height);
        gl.uniform1f(uniforms.uEmission, signboard.emission);
        gl.uniform1f(uniforms.uDissipation, 1 / signboard.dissipation);
        gl.uniform1f(uniforms.uBulbSize, signboard.bulbSize);

        if (this._texture) {
          this.updateTextureOffset();
        }
      };

      __proto.updateTextureOffset = function () {
        var signboard = this._signboard;
        var gl = this._gl;
        var texture = this._texture;
        var uniforms = this._uniforms;

        if (!texture) {
          throw new SignBoardError(MESSAGE.TEXTURE_NOT_INITIALIZED, CODE.TEXTURE_NOT_INITIALIZED);
        }

        var renderingSize = {
          width: gl.drawingBufferWidth,
          height: gl.drawingBufferHeight
        };
        var subImage = getSubImage(texture.size, renderingSize, signboard.objectFit, signboard.contentType);
        gl.uniform2f(uniforms.uTexOffset, subImage.x / renderingSize.width, subImage.y / renderingSize.height);
        gl.uniform2f(uniforms.uTexScale, renderingSize.width / subImage.width, renderingSize.height / subImage.height);
      };

      __proto._compileShader = function (src, type) {
        var gl = this._gl;
        var shader = gl.createShader(type);

        if (!shader) {
          throw new SignBoardError(MESSAGE.FAILED_COMPILE_SHADER("Unexpected Error: " + gl.getError()), CODE.FAILED_COMPILE_SHADER);
        }

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
        this._buffers.position = positionBuffer;
        this._buffers.texcoord = texcoordBuffer;
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
        var uniforms = this._uniforms;

        for (var key in uniforms) {
          uniforms[key] = gl.getUniformLocation(program, key);
        }
      };

      __proto._increaseScrollOffset = function () {
        var signboard = this._signboard;
        var gl = this._gl;
        var texture = this._texture;
        var uniforms = this._uniforms;
        var scrollSpeed = signboard.scrollSpeed;
        if (scrollSpeed === 0) return;

        if (!texture) {
          throw new SignBoardError(MESSAGE.TEXTURE_NOT_INITIALIZED, CODE.TEXTURE_NOT_INITIALIZED);
        }

        var prevVal = this._prevScroll;
        var newVal = prevVal + scrollSpeed * (1000 / signboard.frameRate) / gl.drawingBufferWidth;
        this._prevScroll = newVal;
        gl.uniform1f(uniforms.uScrollOffset, newVal);
      };

      return Renderer;
    }();



    var Constants = {
        __proto__: null,
        ERROR_CODE: CODE,
        CONTENT_TYPE: CONTENT_TYPE,
        OBJECT_FIT: OBJECT_FIT
    };

    var ImageTexture =
    /*#__PURE__*/
    function () {
      function ImageTexture(image) {
        this._image = image;
        this._texture = null;
      }

      var __proto = ImageTexture.prototype;
      Object.defineProperty(__proto, "webGLTexture", {
        get: function () {
          return this._texture;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "size", {
        get: function () {
          return {
            width: this._image.naturalWidth,
            height: this._image.naturalHeight
          };
        },
        enumerable: false,
        configurable: true
      });

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

      __proto.update = function (src) {
        if (!src) return;
        this._image.src = src;
      };

      return ImageTexture;
    }();

    var VideoTexture =
    /*#__PURE__*/
    function () {
      function VideoTexture(video) {
        this._video = video;
        this._texture = null;
      }

      var __proto = VideoTexture.prototype;
      Object.defineProperty(__proto, "webGLTexture", {
        get: function () {
          return this._texture;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "size", {
        get: function () {
          return {
            width: this._video.videoWidth,
            height: this._video.videoHeight
          };
        },
        enumerable: false,
        configurable: true
      });

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

      __proto.update = function (src) {
        if (!src) return;
        var video = this._video;
        video.src = src;
        video.play();
      };

      return VideoTexture;
    }();

    var TextTexture =
    /*#__PURE__*/
    function () {
      function TextTexture(signboard) {
        this._signboard = signboard;
        this._canvas = document.createElement("canvas");
        this._context = this._canvas.getContext("2d");
        this._texture = null;
      }

      var __proto = TextTexture.prototype;
      Object.defineProperty(__proto, "webGLTexture", {
        get: function () {
          return this._texture;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "size", {
        get: function () {
          return {
            width: this._canvas.width,
            height: this._canvas.height
          };
        },
        enumerable: false,
        configurable: true
      });

      __proto.init = function (gl) {
        var signboard = this._signboard;
        var text = signboard.src;
        this._texture = gl.createTexture();

        this._drawText(text);
      };

      __proto.update = function (src) {
        var canvas = this._canvas;

        this._context.clearRect(0, 0, canvas.width, canvas.height);

        this._drawText(src !== null && src !== void 0 ? src : this._signboard.src);
      };

      __proto.upload = function (gl) {
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._canvas);
      };

      __proto._drawText = function (text) {
        var canvas = this._canvas;
        var context = this._context;
        var signboard = this._signboard;

        var options = this._getDrawingOptions();

        for (var key in options) {
          context[key] = options[key];
        }

        var textPadding = parsePadding(signboard.textPadding);
        var textSize = context.measureText(text);
        canvas.width = textSize.actualBoundingBoxRight - textSize.actualBoundingBoxLeft + textPadding[1] + textPadding[3];
        canvas.height = textSize.actualBoundingBoxDescent - textSize.actualBoundingBoxAscent + textPadding[0] + textPadding[2];

        for (var key in options) {
          context[key] = options[key];
        }

        context.fillText(text, textPadding[3], textPadding[0]);
      };

      __proto._getDrawingOptions = function () {
        var signboard = this._signboard;
        return __assign({
          font: "32pt serif",
          textAlign: "left",
          fillStyle: "red",
          textBaseline: "top"
        }, signboard.textOptions);
      };

      return TextTexture;
    }();

    var TextureLoader =
    /*#__PURE__*/
    function () {
      function TextureLoader(signboard) {
        this._signboard = signboard;
      }

      var __proto = TextureLoader.prototype;

      __proto.load = function () {
        return __awaiter(this, void 0, Promise, function () {
          var type;
          return __generator(this, function (_a) {
            type = this._signboard.contentType;

            switch (type) {
              case CONTENT_TYPE.IMAGE:
                return [2
                /*return*/
                , this._loadImage()];

              case CONTENT_TYPE.VIDEO:
                return [2
                /*return*/
                , this._loadVideo()];

              case CONTENT_TYPE.TEXT:
                return [2
                /*return*/
                , new TextTexture(this._signboard)];

              default:
                throw new SignBoardError(MESSAGE.WRONG_OPTION(type, "contentType", Object.keys(CONTENT_TYPE).map(function (key) {
                  return CONTENT_TYPE[key];
                })), CODE.WRONG_OPTION);
            }
          });
        });
      };

      __proto._loadImage = function () {
        return __awaiter(this, void 0, Promise, function () {
          var signboard, image, src;
          return __generator(this, function (_a) {
            signboard = this._signboard;
            image = new Image();
            src = signboard.src;
            return [2
            /*return*/
            , new Promise(function (resolve, reject) {
              image.addEventListener(BROWSER.LOAD, function () {
                resolve(new ImageTexture(image));
              });
              image.addEventListener(BROWSER.ERROR, function () {
                reject(new SignBoardError(MESSAGE.FAILED_TO_LOAD_IMAGE(src), CODE.FAILED_TO_LOAD_IMAGE));
              });

              var attribs = __assign({
                crossOrigin: "anonymous"
              }, signboard.contentAttribs);

              for (var key in attribs) {
                image.setAttribute(key, attribs[key]);
              }

              image.src = src;
            })];
          });
        });
      };

      __proto._loadVideo = function () {
        return __awaiter(this, void 0, Promise, function () {
          var signboard, video, src;
          return __generator(this, function (_a) {
            signboard = this._signboard;
            video = document.createElement("video");
            src = signboard.src;
            return [2
            /*return*/
            , new Promise(function (resolve, reject) {
              video.addEventListener(BROWSER.LOADED_DATA, function () {
                resolve(new VideoTexture(video));
              });
              video.addEventListener(BROWSER.ERROR, function () {
                reject(new SignBoardError(MESSAGE.FAILED_TO_LOAD_IMAGE(src), CODE.FAILED_TO_LOAD_IMAGE));
              });

              var attribs = __assign({
                loop: true,
                playsInline: true,
                autoplay: true,
                muted: true,
                crossOrigin: "anonymous"
              }, signboard.contentAttribs);

              for (var key in attribs) {
                video.setAttribute(key, attribs[key]);
              }

              video.src = src;
            })];
          });
        });
      };

      return TextureLoader;
    }();

    /**
     * WebGL-based LED SignBoard effect for image / video / text
     */

    var SignBoard =
    /*#__PURE__*/
    function () {
      /**
       * @param {string|HTMLElement} canvas CSS query selector or canvas element
       * @param {string} src Source URL to the image / video
       * @param {SignBoardOptions} options An options object
       */
      function SignBoard(canvas, src, _a) {
        var _b = _a === void 0 ? {} : _a,
            _c = _b.contentType,
            contentType = _c === void 0 ? CONTENT_TYPE.IMAGE : _c,
            _d = _b.contentAttribs,
            contentAttribs = _d === void 0 ? {} : _d,
            _e = _b.autoResize,
            autoResize = _e === void 0 ? true : _e,
            _f = _b.autoInit,
            autoInit = _f === void 0 ? true : _f,
            _g = _b.frameRate,
            frameRate = _g === void 0 ? 60 : _g,
            _h = _b.tileSize,
            tileSize = _h === void 0 ? 8 : _h,
            _j = _b.emission,
            emission = _j === void 0 ? 1.5 : _j,
            _k = _b.dissipation,
            dissipation = _k === void 0 ? 0.5 : _k,
            _l = _b.bulbSize,
            bulbSize = _l === void 0 ? 0.7 : _l,
            _m = _b.objectFit,
            objectFit = _m === void 0 ? OBJECT_FIT.FILL : _m,
            _o = _b.textOptions,
            textOptions = _o === void 0 ? {} : _o,
            _p = _b.textPadding,
            textPadding = _p === void 0 ? 0 : _p,
            _q = _b.scrollSpeed,
            scrollSpeed = _q === void 0 ? 0 : _q,
            _r = _b.initOnFontLoad,
            initOnFontLoad = _r === void 0 ? false : _r; // Core components


        this._renderer = new Renderer(getCanvas(canvas), this);
        this._src = src;
        this._texture = null; // Internal States

        this._initialized = false; // Bind options

        this._contentType = contentType;
        this._contentAttribs = contentAttribs;
        this._autoResize = autoResize;
        this._autoInit = autoInit;
        this._frameRate = frameRate;
        this._tileSize = tileSize;
        this._emission = emission;
        this._dissipation = dissipation;
        this._bulbSize = bulbSize;
        this._objectFit = objectFit;
        this._textOptions = textOptions;
        this._textPadding = textPadding;
        this._scrollSpeed = scrollSpeed;
        this._initOnFontLoad = initOnFontLoad;
        this.resize = this.resize.bind(this);
        var shouldCheckFontLoad = Array.isArray(initOnFontLoad) ? initOnFontLoad[0] : initOnFontLoad;

        if (autoInit && !shouldCheckFontLoad) {
          this.init();
        }

        if (shouldCheckFontLoad) {
          this._checkFontLoad();
        }
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
        /**
         * Current src of the image/video, or text string when the `contentType` is "text"
         * @type {string}
         * @readonly
         */
        get: function () {
          return this._src;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "initialized", {
        /**
         * Whether the {@link SignBoard#init} is called
         * @type {boolean}
         * @readonly
         */
        get: function () {
          return this._initialized;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "texture", {
        get: function () {
          return this._texture;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "contentType", {
        // Options

        /**
         * Current value of the `contentType` option
         * @see {@link SignBoardOptions}
         */
        get: function () {
          return this._contentType;
        },
        set: function (val) {
          this._contentType = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "contentAttribs", {
        /**
         * Current value of the `contentAttribs` option
         * @see {@link SignBoardOptions}
         */
        get: function () {
          return this._contentAttribs;
        },
        set: function (val) {
          this._contentAttribs = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "autoResize", {
        /**
         * Current value of the `autoResize` option
         * @see {@link SignBoardOptions}
         */
        get: function () {
          return this._autoResize;
        },
        set: function (val) {
          this._updateAutoResize(val);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "autoInit", {
        /**
         * Current value of the `autoInit` option
         * @see {@link SignBoardOptions}
         * @readonly
         */
        get: function () {
          return this._autoInit;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "frameRate", {
        /**
         * Current value of the `frameRate` option
         * @see {@link SignBoardOptions}
         */
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
        /**
         * Current value of the `tileSize` option
         * @see {@link SignBoardOptions}
         */
        get: function () {
          return this._tileSize;
        },
        set: function (val) {
          this._tileSize = val;

          this._renderer.updateUniforms();

          this._renderer.render();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "emission", {
        /**
         * Current value of the `emission` option
         * @see {@link SignBoardOptions}
         */
        get: function () {
          return this._emission;
        },
        set: function (val) {
          this._emission = val;

          this._renderer.updateUniforms();

          this._renderer.render();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "dissipation", {
        /**
         * Current value of the `dissipation` option
         * @see {@link SignBoardOptions}
         */
        get: function () {
          return this._dissipation;
        },
        set: function (val) {
          this._dissipation = val;

          this._renderer.updateUniforms();

          this._renderer.render();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "bulbSize", {
        /**
         * Current value of the `bulbSize` option
         * @see {@link SignBoardOptions}
         */
        get: function () {
          return this._bulbSize;
        },
        set: function (val) {
          this._bulbSize = val;

          this._renderer.updateUniforms();

          this._renderer.render();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "objectFit", {
        /**
         * Current value of the `objectFit` option
         * @see {@link SignBoardOptions}
         */
        get: function () {
          return this._objectFit;
        },
        set: function (val) {
          this._objectFit = val;

          this._renderer.updateTextureOffset();

          this._renderer.render();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "textOptions", {
        /**
         * Current value of the `textOptions` option
         * @see {@link SignBoardOptions}
         */
        get: function () {
          return this._textOptions;
        },
        set: function (val) {
          this._textOptions = val;
          this.update();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "textPadding", {
        /**
         * Current value of the `textPadding` option
         * @see {@link SignBoardOptions}
         */
        get: function () {
          return this._textPadding;
        },
        set: function (val) {
          this._textPadding = val;
          this.update();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "scrollSpeed", {
        /**
         * Current value of the `scrollSpeed` option
         * @see {@link SignBoardOptions}
         */
        get: function () {
          return this._scrollSpeed;
        },
        set: function (val) {
          this._scrollSpeed = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "initOnFontLoad", {
        /**
         * Current value of the `initOnFontLoad` option
         * @see {@link SignBoardOptions}
         * @readonly
         */
        get: function () {
          return this._initOnFontLoad;
        },
        enumerable: false,
        configurable: true
      });
      /**
       * Destroy the current instance, and release all resources
       * @returns {void}
       */

      __proto.destroy = function () {
        this._renderer.destroy();

        this._updateAutoResize(false);

        this._initialized = false;
      };
      /**
       * Initialize SignBoard
       * @returns {Promise<SignBoard>} The current instance
       */


      __proto.init = function () {
        return __awaiter(this, void 0, Promise, function () {
          var renderer, textureLoader, texture;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                renderer = this._renderer;
                textureLoader = new TextureLoader(this);
                return [4
                /*yield*/
                , textureLoader.load()];

              case 1:
                texture = _a.sent();
                this._texture = texture;
                renderer.resize();
                renderer.init();
                renderer.setTexture(texture);

                if (this._autoResize) {
                  this._autoResize = false;

                  this._updateAutoResize(true);
                }

                this._initialized = true;
                this.start();
                return [2
                /*return*/
                , this];
            }
          });
        });
      };
      /**
       * Resize SignBoard with the latest size of the canvas
       * @returns {SignBoard} The current instance
       */


      __proto.resize = function () {
        var renderer = this._renderer;
        renderer.resize();
        renderer.render();
        return this;
      };
      /**
       * Start rendering
       * @returns {SignBoard} The current instance
       */


      __proto.start = function () {
        var renderer = this._renderer;

        if (this._contentType === CONTENT_TYPE.VIDEO || this._scrollSpeed !== 0) {
          renderer.start();
        } else {
          // Render single frame
          renderer.render();
        }

        return this;
      };
      /**
       * Stop rendering
       * @returns {SignBoard} The current instance
       */


      __proto.stop = function () {
        this._renderer.stop();

        return this;
      };
      /**
       * Update the texture
       * @param {string?} src New src to the image/video or text string if `contentType` is "text"
       * @returns {SignBoard} The current instance
       */


      __proto.update = function (src) {
        var texture = this._texture;
        if (!texture) throw new SignBoardError(MESSAGE.TEXTURE_NOT_INITIALIZED, CODE.TEXTURE_NOT_INITIALIZED);
        texture.update(src);

        this._renderer.updateUniforms();

        return this;
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

      __proto._checkFontLoad = function () {
        var _this = this;

        var font = this._textOptions.font;

        if (!font || document.fonts.check(font)) {
          this.init();
          return;
        }

        var initOnFontLoad = this._initOnFontLoad;
        var textToCheck = Array.isArray(initOnFontLoad) ? initOnFontLoad[1] : "a";
        document.fonts.load(font, textToCheck).then(function () {
          _this.init();
        });
      };

      return SignBoard;
    }();



    var Core = {
        __proto__: null,
        Renderer: Renderer,
        SignBoardError: SignBoardError,
        TextureLoader: TextureLoader
    };



    var Texture = {
        __proto__: null,
        ImageTexture: ImageTexture,
        VideoTexture: VideoTexture
    };

    merge(SignBoard, Core);
    merge(SignBoard, Texture);
    merge(SignBoard, Constants);

    return SignBoard;

})));
//# sourceMappingURL=signboard.js.map
