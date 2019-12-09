const glslify = require("rollup-plugin-glslify");
const buildHelper = require("@egjs/build-helper");

const name = "Signboard";
const external = {}
const plugins = [
  glslify({ basedir: "./src/shader" })
];

export default buildHelper([
  {
    name,
    input: "./src/index.umd.ts",
    output: "./lib/signboard.js",
    format: "umd",
    external,
    plugins,
  },
  {
    name,
    input: "./src/index.umd.ts",
    output: "./lib/signboard.min.js",
    format: "umd",
    uglify: true,
    external,
    plugins,
  },
  {
    name,
    input: "./src/index.umd.ts",
    output: "./lib/signboard.pkgd.js",
    format: "umd",
    resolve: true,
    plugins,
  },
  {
    name,
    input: "./src/index.umd.ts",
    output: "./lib/signboard.pkgd.min.js",
    format: "umd",
    resolve: true,
    uglify: true,
    plugins,
  },
  {
    input: "./src/index.ts",
    output: "./lib/signboard.esm.js",
    format: "esm",
    external,
    exports: "named",
    plugins,
  },
]);
