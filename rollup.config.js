const glslify = require("rollup-plugin-glslify");
const buildHelper = require("@egjs/build-helper");

const name = "Signboard";
const external = {}
const plugins = [glslify()];

export default buildHelper([
  {
    name,
    input: "./src/index.umd.ts",
    output: "./dist/signboard.js",
    format: "umd",
    external,
    plugins
  },
  {
    name,
    input: "./src/index.umd.ts",
    output: "./dist/signboard.min.js",
    format: "umd",
    uglify: true,
    external,
    plugins
  },
  {
    input: "./src/index.ts",
    output: "./dist/signboard.esm.js",
    format: "esm",
    external,
    exports: "named",
    plugins
  },
]);
