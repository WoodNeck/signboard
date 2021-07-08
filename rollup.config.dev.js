const glslify = require("rollup-plugin-glslify");
const serve = require("rollup-plugin-serve");
const livereload = require("rollup-plugin-livereload");
const buildHelper = require("@egjs/build-helper");

const plugins = [glslify(), serve("test/manual"), livereload()];

export default buildHelper([
  {
    name: "SignBoard",
    input: "./src/index.umd.ts",
    output: "./test/manual/dist/signboard.js",
    format: "umd",
    resolve: true,
    plugins
  }
]);

