const glslify = require("rollup-plugin-glslify");
const buildHelper = require("@egjs/build-helper");

const name = "Signboard";
const external = {}
const plguins = [
  glslify({
    basedir: "./src/shader"
  })
]
export default buildHelper([
  {
    name,
    input: "./src/index.umd.ts",
    output: "./lib/signboard.js",
    format: "umd",
    external,
    plguins,
  },
  {
    name,
    input: "./src/index.umd.ts",
    output: "./lib/signboard.min.js",
    format: "umd",
    uglify: true,
    external,
    plguins,
  },
  {
    name,
    input: "./src/index.umd.ts",
    output: "./lib/signboard.pkgd.js",
    format: "umd",
    resolve: true,
    plguins,
  },
  {
    name,
    input: "./src/index.umd.ts",
    output: "./lib/signboard.pkgd.min.js",
    format: "umd",
    resolve: true,
    uglify: true,
    plguins,
  },
  {
    input: "./src/index.ts",
    output: "./lib/signboard.esm.js",
    format: "esm",
    external,
    exports: "named",
    plguins,
  },
]);
