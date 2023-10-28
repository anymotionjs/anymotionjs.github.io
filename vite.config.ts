import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    jsx: "transform",
    jsxFragment: "__airx__.Fragment",
    jsxFactory: "__airx__.createElement",
    jsxInject: "import * as __airx__ from 'airx'",
  },
});
