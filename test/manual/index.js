const signboard = new SignBoard("#test", "./video/Astronaut2.mp4", {
  contentType: "video",
  objectFit: "contain"
});

const gui = new dat.GUI({ name: "Controls" });

gui.add(signboard.renderer, "objectFit", SignBoard.OBJECT_FIT);
gui.add(signboard.renderer, "tileSize", 1, 64);
gui.add(signboard.renderer, "emission", 0.1, 5, 0.01);
gui.add(signboard.renderer, "dissipation", 0.1, 2, 0.01);
gui.add(signboard.renderer, "bulbSize", 0.1, 2.5, 0.01);
