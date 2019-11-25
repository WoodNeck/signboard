const buildHelper = require("@egjs/build-helper");

const name = "Signboard";
const external = {}
export default buildHelper([
  {
    name,
    input: "./src/index.umd.ts",
    output: "./lib/signboard.js",
    format: "umd",
    external,
  },
  {
    name,
    input: "./src/index.umd.ts",
    output: "./lib/signboard.min.js",
    format: "umd",
    uglify: true,
    external,
  },
  {
    name,
    input: "./src/index.umd.ts",
    output: "./lib/signboard.pkgd.js",
    format: "umd",
    resolve: true,
  },
  {
    name,
    input: "./src/index.umd.ts",
    output: "./lib/signboard.pkgd.min.js",
    format: "umd",
    resolve: true,
    uglify: true,
  },
  {
    input: "./src/index.ts",
    output: "./lib/signboard.esm.js",
    format: "esm",
    external,
    exports: "named",
  },
]);
