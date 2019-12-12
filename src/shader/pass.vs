attribute vec4 aVPos;
attribute vec4 aTCrd;
varying vec4 vTCrd;
void main() {
  gl_Position = aVPos;
  vTCrd = aTCrd;
}
