import { createRollupConfigs } from "./scripts/base.config.js";
import autoPreprocess from "svelte-preprocess";
import postcssImport from "postcss-import";
import alias from "@rollup/plugin-alias";
import path from "path";

const production = !process.env.ROLLUP_WATCH;

export const config = {
  staticDir: "static",
  distDir: "dist",
  buildDir: `dist/build`,
  serve: !production,
  production,
  rollupWrapper: (rollup) => {
    rollup.plugins = [
      ...rollup.plugins,
      alias({
        entries: [
          {
            find: "components",
            replacement: path.resolve(__dirname, "src/components"),
          },
          {
            find: "icon",
            replacement: path.resolve(__dirname, "src/icons/Icon.js"),
          },
          {
            find: "services",
            replacement: path.resolve(__dirname, "src/services"),
          },
          {
            find: "constants",
            replacement: path.resolve(__dirname, "src/constants.js")
          },
          {
            find: "database",
            replacement: path.resolve(__dirname, "src/database/database.js"),
          },
        ],
      }),
    ];

    return rollup;
  },
  svelteWrapper: (svelte) => {
    svelte.preprocess = [
      autoPreprocess({
        postcss: { plugins: [postcssImport()] },
        defaults: { style: "postcss" },
      }),
    ];
  },
  swWrapper: (worker) => worker,
};

const configs = createRollupConfigs(config);

export default configs;

/**
  Wrappers can either mutate or return a config

  wrapper example 1
  svelteWrapper: (cfg, ctx) => {
    cfg.preprocess: mdsvex({ extension: '.md' }),
  }

  wrapper example 2
  rollupWrapper: cfg => {
    cfg.plugins = [...cfg.plugins, myPlugin()]
    return cfg
  }
*/
