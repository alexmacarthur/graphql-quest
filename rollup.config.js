const pkg = require("./package.json");
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";

const isProduction = process.env.NODE_ENV === "production";

const OUTPUT_DATA = [
  {
    file: pkg.main,
    format: "umd",
  },
  {
    file: pkg.module,
    format: "es",
  },
];

export default OUTPUT_DATA.map(({ file, format }) => {
  let plugins = [typescript()];

  if (isProduction) {
    plugins.push(terser());
  }

  return {
    input: "./src/quest.ts",
    output: {
      file,
      format,
      name: "Quest",
    },
    plugins,
  };
});
