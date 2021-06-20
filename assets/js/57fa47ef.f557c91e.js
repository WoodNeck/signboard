(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[776],{2891:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return u},contentTitle:function(){return c},metadata:function(){return f},toc:function(){return l},default:function(){return h}});var i=n(2122),r=n(9756),o=(n(7294),n(3905)),a=n(3844),s=["components"],u={},c=void 0,f={type:"mdx",permalink:"/signboard/Demo",source:"@site/src/pages/Demo.mdx"},l=[{value:"Image Rendering",id:"image-rendering",children:[]},{value:"Video Rendering",id:"video-rendering",children:[]}],d={toc:l};function h(e){var t=e.components,n=(0,r.Z)(e,s);return(0,o.kt)("wrapper",(0,i.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"image-rendering"},"Image Rendering"),(0,o.kt)("div",{className:"container demo-canvas-wrapper"},(0,o.kt)(a.Z,{className:"demo-canvas",src:"/img/test.jpg",mdxType:"SignBoard"})),(0,o.kt)("hr",null),(0,o.kt)("h2",{id:"video-rendering"},"Video Rendering"),(0,o.kt)("div",{className:"container demo-canvas-wrapper"},(0,o.kt)(a.Z,{className:"demo-canvas",src:"/video/Astronaut.mp4",contentType:"video",mdxType:"SignBoard"})))}h.isMDXComponent=!0},3844:function(e,t,n){"use strict";n.d(t,{Z:function(){return j}});var i=n(2122),r=n(9756),o=n(3552),a=n(7294),s=function(e,t){return(s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)};function u(e,t,n,i){return new(n||(n=Promise))((function(r,o){function a(e){try{u(i.next(e))}catch(t){o(t)}}function s(e){try{u(i.throw(e))}catch(t){o(t)}}function u(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}u((i=i.apply(e,t||[])).next())}))}function c(e,t){var n,i,r,o,a={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,i&&(r=2&o[0]?i.return:o[0]?i.throw||((r=i.return)&&r.call(i),0):i.next)&&!(r=r.call(i,o[1])).done)return r;switch(i=0,r&&(o=[2&o[0],r.value]),o[0]){case 0:case 1:r=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,i=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(r=a.trys,(r=r.length>0&&r[r.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!r||o[1]>r[0]&&o[1]<r[3])){a.label=o[1];break}if(6===o[0]&&a.label<r[1]){a.label=r[1],r=o;break}if(r&&a.label<r[2]){a.label=r[2],a.ops.push(o);break}r[2]&&a.ops.pop(),a.trys.pop();continue}o=t.call(e,a)}catch(s){o=[6,s],i=0}finally{n=r=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}}var f=function(e){function t(n,i){var r=e.call(this,"(signboard.js) "+n)||this;return r.message=n,r.code=i,Object.setPrototypeOf(r,t.prototype),r.name="SignBoardError",r}return function(e,t){function n(){this.constructor=e}s(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}(t,e),t}(Error),l=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),d=new Float32Array([0,1,1,1,0,0,0,0,1,1,1,0]),h=0,_=1,m=2,p=3,T=4,g=5,v=6,b=function(e,t){return typeof e+" is not a "+t.map((function(e){return'"'+e+'"'})).join(" or ")+"."},E=function(e){return'Element with selector "'+e+'" not found.'},R=function(e){return"Given element <"+e.tagName+"> is not a canvas."},y=function(e){return'WebGL context creation failed with the following error - "'+e+'"'},S=function(e){return'Failed compiling shader - "'+e+'"'},x=function(e){return'Failed compiling WebGL program - "'+e+'"'},P=function(e){return'Failed to load image with src - "'+e+'"'},A="webglcontextcreationerror",w="load",z="error",U="resize",L="loadeddata";var D=function(e){var t=function(e){var t=null;if("string"==typeof e){var n=document.querySelector(e);if(!n)throw new f(E(e),_);t=n}else e&&e.nodeType===Node.ELEMENT_NODE&&(t=e);return t}(e);if(!t)throw new f(b(e,["HTMLElement","string"]),h);if(!/^canvas$/i.test(t.tagName))throw new f(R(t),m);return t},I=function(){function e(e,t){var n=this,i=t.frameRate,r=t.tileSize,o=t.emission,a=t.bulbSize;this._onAnimationFrame=function(e){var t=n._lastRenderTime,i=e-t,r=1e3/n._frameRate;(i>=r||t<0)&&(n.render(),n._lastRenderTime=t+r),n._animationID=requestAnimationFrame(n._onAnimationFrame)},this._canvas=e,this._gl=function(e){var t,n="",i=function(e){n=e.statusMessage||"Unknown Error"};if(e.addEventListener(A,i),t=e.getContext("webgl",{}),e.removeEventListener(A,i),!t)throw new f(y(n),p);return e.addEventListener("webglcontextlost",(function(e){console.log("contextlost"),e.preventDefault()}),!1),t}(e),this._program=null,this._texture=null,this._lastRenderTime=-1,this._animationID=-1,this._uniforms={uInvTileSize:null,uResolution:null,uEmission:null,uBulbSize:null},this._frameRate=i,this._tileSize=r,this._emission=o,this._bulbSize=a}var t=e.prototype;return Object.defineProperty(t,"canvas",{get:function(){return this._canvas},enumerable:!1,configurable:!0}),Object.defineProperty(t,"gl",{get:function(){return this._gl},enumerable:!1,configurable:!0}),Object.defineProperty(t,"frameRate",{get:function(){return this._frameRate},set:function(e){this._frameRate=e},enumerable:!1,configurable:!0}),Object.defineProperty(t,"tileSize",{get:function(){return this._tileSize},set:function(e){this._tileSize=e,this._updateUniforms(),this.render()},enumerable:!1,configurable:!0}),Object.defineProperty(t,"emission",{get:function(){return this._emission},set:function(e){this._emission=e,this._updateUniforms(),this.render()},enumerable:!1,configurable:!0}),Object.defineProperty(t,"bulbSize",{get:function(){return this._bulbSize},set:function(e){this._bulbSize=e,this._updateUniforms(),this.render()},enumerable:!1,configurable:!0}),t.destroy=function(){this.stop(),this._texture=null,this._gl.deleteProgram(this._program)},t.init=function(){var e=this._gl,t=this._createWebGLProgram();this._program=t,e.useProgram(t),this._bindAttributes(t),this._bindUniforms(t),this._updateUniforms()},t.setTexture=function(e){e.init(this._gl),this._texture=e},t.resize=function(){var e=this._canvas;e.width=e.clientWidth,e.height=e.clientHeight,this._updateUniforms()},t.start=function(){this._animationID=requestAnimationFrame(this._onAnimationFrame)},t.stop=function(){cancelAnimationFrame(this._animationID),this._animationID=-1,this._lastRenderTime=-1},t.render=function(){var e=this._gl;this._texture.upload(this._gl),e.viewport(0,0,e.drawingBufferWidth,e.drawingBufferHeight),e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.TRIANGLES,0,6),e.bindTexture(e.TEXTURE_2D,null)},t._compileShader=function(e,t){var n=this._gl,i=n.createShader(t);if(n.shaderSource(i,e),n.compileShader(i),!n.getShaderParameter(i,n.COMPILE_STATUS))throw new f(S(n.getShaderInfoLog(i)),T);return i},t._createWebGLProgram=function(){var e=this._gl,t=e.createProgram(),n=this._compileShader("#define GLSLIFY 1\nattribute vec4 aPosition;attribute vec2 aTexCoord;varying vec2 vTexCoord;void main(){gl_Position=aPosition;vTexCoord=aTexCoord;}",e.VERTEX_SHADER),i=this._compileShader("precision highp float;\n#define GLSLIFY 1\nvarying vec2 vTexCoord;uniform float uInvTileSize;uniform vec2 uResolution;uniform float uEmission;uniform float uBulbSize;uniform sampler2D uTexture;float sstep(float edge0,float edge1,float x){x=clamp((x-edge0)/(edge1-edge0),0.0,1.0);return x*x*(3.0-2.0*x);}void main(){vec2 tilesPerSide=floor(uResolution*uInvTileSize);vec2 invTilesPerSide=1.0/tilesPerSide;vec2 tileCenter=floor(vTexCoord*tilesPerSide)*invTilesPerSide+invTilesPerSide*0.5;vec2 diffToCenter=vTexCoord-tileCenter;vec2 distToCenter=diffToCenter*diffToCenter*4.0*tilesPerSide*tilesPerSide;float dist=distToCenter.x+distToCenter.y;float dissipation=1.0-sstep(0.0,uBulbSize*uBulbSize,dist*dist);gl_FragColor=texture2D(uTexture,tileCenter)*dissipation*uEmission;}",e.FRAGMENT_SHADER);if(e.attachShader(t,n),e.attachShader(t,i),e.linkProgram(t),!e.getProgramParameter(t,e.LINK_STATUS))throw new f(x(e.getProgramInfoLog(t)),g);return t},t._bindAttributes=function(e){var t=this._gl,n=t.getAttribLocation(e,"aPosition"),i=t.getAttribLocation(e,"aTexCoord"),r=t.createBuffer(),o=t.createBuffer();t.enableVertexAttribArray(n),t.bindBuffer(t.ARRAY_BUFFER,r),t.bufferData(t.ARRAY_BUFFER,l,t.STATIC_DRAW),t.vertexAttribPointer(n,2,t.FLOAT,!1,0,0),t.enableVertexAttribArray(i),t.bindBuffer(t.ARRAY_BUFFER,o),t.bufferData(t.ARRAY_BUFFER,d,t.STATIC_DRAW),t.vertexAttribPointer(i,2,t.FLOAT,!1,0,0)},t._bindUniforms=function(e){var t=this._gl;this._uniforms={uInvTileSize:t.getUniformLocation(e,"uInvTileSize"),uResolution:t.getUniformLocation(e,"uResolution"),uEmission:t.getUniformLocation(e,"uEmission"),uBulbSize:t.getUniformLocation(e,"uBulbSize")}},t._updateUniforms=function(){var e=this._gl,t=this._canvas,n=this._uniforms;this._program&&(e.uniform1f(n.uInvTileSize,1/this._tileSize),e.uniform2f(n.uResolution,t.width,t.height),e.uniform1f(n.uEmission,this._emission),e.uniform1f(n.uBulbSize,this._bulbSize))},e}(),C="image",F="video",O=function(){function e(e){this._image=e,this._texture=null}var t=e.prototype;return t.init=function(e){this._texture=e.createTexture()},t.upload=function(e){e.bindTexture(e.TEXTURE_2D,this._texture),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,this._image)},e}(),B=function(){function e(e){this._video=e,this._texture=null}var t=e.prototype;return t.init=function(e){this._texture=e.createTexture(),this._video.play()},t.upload=function(e){e.bindTexture(e.TEXTURE_2D,this._texture),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,this._video)},e}(),X=function(){function e(e,t){this._src=e,this._type=t}var t=e.prototype;return t.load=function(){return u(this,void 0,Promise,(function(){return c(this,(function(e){switch(this._type){case C:return[2,this._loadImage()];case F:return[2,this._loadVideo()]}return[2]}))}))},t._loadImage=function(){return u(this,void 0,Promise,(function(){var e,t;return c(this,(function(n){return e=new Image,t=this._src,[2,new Promise((function(n,i){e.addEventListener(w,(function(){n(new O(e))})),e.addEventListener(z,(function(){i(new f(P(t),v))})),e.crossOrigin="anonymous",e.src=t}))]}))}))},t._loadVideo=function(){return u(this,void 0,Promise,(function(){var e,t;return c(this,(function(n){return e=document.createElement("video"),t=this._src,[2,new Promise((function(n,i){e.addEventListener(L,(function(){n(new B(e))})),e.addEventListener(z,(function(){i(new f(P(t),v))})),e.loop=!0,e.playsInline=!0,e.crossOrigin="anonymous",e.src=t,e.load()}))]}))}))},e}(),G=function(){function e(e,t,n){var i=void 0===n?{}:n,r=i.contentType,o=void 0===r?C:r,a=i.frameRate,s=void 0===a?60:a,u=i.autoResize,c=void 0===u||u,f=i.tileSize,l=void 0===f?8:f,d=i.emission,h=void 0===d?1:d,_=i.bulbSize,m=void 0===_?.7:_;this._renderer=new I(D(e),{frameRate:s,tileSize:l,emission:h,bulbSize:m}),this._src=t,this._initialized=!1,this._contentType=o,this._autoResize=c,this.resize=this.resize.bind(this),this.init()}var t=e.prototype;return Object.defineProperty(t,"renderer",{get:function(){return this._renderer},enumerable:!1,configurable:!0}),Object.defineProperty(t,"src",{get:function(){return this._src},enumerable:!1,configurable:!0}),Object.defineProperty(t,"initialized",{get:function(){return this._initialized},enumerable:!1,configurable:!0}),Object.defineProperty(t,"contentType",{get:function(){return this._contentType},set:function(e){this._contentType=e},enumerable:!1,configurable:!0}),Object.defineProperty(t,"frameRate",{get:function(){return this._renderer.frameRate},set:function(e){this._renderer.frameRate=e},enumerable:!1,configurable:!0}),Object.defineProperty(t,"tileSize",{get:function(){return this._renderer.tileSize},set:function(e){this._renderer.tileSize=e},enumerable:!1,configurable:!0}),Object.defineProperty(t,"autoResize",{get:function(){return this._autoResize},set:function(e){this._updateAutoResize(e)},enumerable:!1,configurable:!0}),t.init=function(){return u(this,void 0,void 0,(function(){var e,t;return c(this,(function(n){switch(n.label){case 0:return e=this._renderer,[4,new X(this._src,this._contentType).load()];case 1:return t=n.sent(),e.resize(),e.init(),e.setTexture(t),this._contentType===F?e.start():e.render(),this._autoResize&&(this._autoResize=!1,this._updateAutoResize(!0)),this._initialized=!0,[2]}}))}))},t.resize=function(){var e=this._renderer;e.resize(),e.render()},t._updateAutoResize=function(e){this._autoResize!==e&&(e?window.addEventListener(U,this.resize):window.removeEventListener(U,this.resize),this._autoResize=e)},e}(),N=["src","contentType"],j=function(e){function t(t){var n;return(n=e.call(this,t)||this)._src=t.src,n._contentType=t.contentType,n._canvas=a.createRef(),n}(0,o.Z)(t,e);var n=t.prototype;return n.componentDidMount=function(){this._instance=new G(this._canvas.current,this._src,{contentType:this._contentType})},n.render=function(){var e=this.props,t=(e.src,e.contentType,(0,r.Z)(e,N));return a.createElement("canvas",(0,i.Z)({},t,{ref:this._canvas}))},t}(a.Component)}}]);