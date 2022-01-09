// rollup.config.js
import typescript from "@rollup/plugin-typescript";
import { uglify } from "rollup-plugin-uglify";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
    format: "cjs",
    name: "FireEnjin",
  },
  plugins: [typescript(), uglify()],
};
