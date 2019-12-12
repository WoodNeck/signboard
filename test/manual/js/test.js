const sb = new Signboard.LEDSignboard("#signboard", {
  width: 512, height: 512
});

const text = new Signboard.Text({
  text: "Hi!",
  font: "24px arial",
  position: [24, 24],
  fillStyle: "blue",
});
const text2 = new Signboard.Text({
  text: "Hello World!",
  font: "24px arial",
  position: [12, 96],
  fillStyle: "black",
});
const text3 = new Signboard.Text({
  text: "asmdlfkmadlskfmadlsk!",
  font: "24px arial",
  position: [0, 48],
  fillStyle: "red",
});

sb.add(text)
  .add(text2)
  .add(text3)
  .start();
