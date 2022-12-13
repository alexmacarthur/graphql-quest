import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  test: {
    mockReset: true,
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "Quest",
      fileName: (format) => `index.${format}.js`,
    },
  },
});
