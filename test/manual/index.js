const signboard = new SignBoard("#test", "Text? 텍스트! 💤😀🐈", {
  contentType: "text",
  objectFit: "fill",
  textOptions: {
    font: "96pt cursive",
    fillStyle: "rgb(192, 192, 192)"
  },
  textPadding: [5, 15, 10, 15],
  scrollSpeed: 1
});

const gui = new dat.GUI({ name: "Controls" });

gui.add(signboard, "objectFit", SignBoard.OBJECT_FIT);
gui.add(signboard, "frameRate", 1, 128, 1);
gui.add(signboard, "tileSize", 1, 64, 1);
gui.add(signboard, "emission", 0.1, 5, 0.01);
gui.add(signboard, "dissipation", 0.1, 2, 0.01);
gui.add(signboard, "bulbSize", 0.1, 2.5, 0.01);
gui.add(signboard, "scrollSpeed", 0, 2.5, 0.01);
