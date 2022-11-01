import nested from "postcss-nested";
import autoprefixer from "autoprefixer";
import postcssImport from "postcss-import";
import cssnano from "cssnano";

const dev = process.env.NODE_ENV === "development";

export default {
  plugins: [
    nested(),
    autoprefixer(),
    postcssImport(),
    !dev &&
      cssnano({
        preset: "default",
      }),
  ],
};
