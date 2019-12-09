precision mediump float;
uniform sampler2D uTex0;
uniform vec4 uScreenSize;

void main() {
  vec2 coord = (gl_FragCoord.xy * uScreenSize.zw) * 2. - 1.;
  gl_FragColor = texture2D(uTex0, coord);
}
