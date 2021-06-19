const glslify = require("rollup-plugin-glslify");
const buildHelper = require("@egjs/build-helper");
const plugins = [glslify()];

export default buildHelper([
  {
    name: "SignBoard",
    input: "./src/index.umd.ts",
    output: "./lib/signboard.pkgd.js",
    format: "umd",
    resolve: true,
    plugins
  }
]);

