// src/server/index.ts
import { createServer as createViteServer } from "vite";

// src/setConfig.ts
function setConfig(config) {
  if (!config.vite)
    config.vite = {};
  if (!config.frontend)
    config.frontend = true;
  if (!config.backend)
    config.backend = {};
  if (!config.backend.entry)
    config.backend.entry = "src/index.ts";
  if (!config.vite.plugins)
    config.vite.plugins = [];
  if (!config.server)
    config.server = {};
  if (!config.server.port)
    config.server.port = 3001;
  if (!config.plugins)
    config.plugins = [];
  config.plugins = [config.plugins].flat();
  for (let plugin of config.plugins) {
    if (plugin.magieConfig) {
      config = { ...config, ...plugin.magieConfig(config) };
    }
  }
}

// src/plugin/devPlugin.ts
function devPlugin(config) {
  return [
    {
      name: "@magie/server",
      enforce: "post",
      async configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          const module = await server.ssrLoadModule(config.backend.entry);
          module.default(req, res, next);
        });
      }
    }
  ];
}

// src/server/index.ts
import chalk from "chalk";
async function createDevServer(config) {
  setConfig(config);
  const viteServer = await createViteServer({
    ...config.vite,
    server: {
      port: config.server.port
    },
    plugins: [config.plugins, devPlugin(config)],
    define: {
      ...config.vite.define,
      ...config.define
    }
  });
  viteServer.listen();
  console.log(chalk.red("\u2713 ") + chalk.green("Magie dev server starts successfully on port ") + chalk.blue(config.server.port) + chalk.green("!"));
}

// src/index.ts
function defineConfig(config) {
  if (typeof config === "function") {
    const buildConfig = config("build");
    const devConfig = config("dev");
    return {
      __magieDefineConfig: {
        build: buildConfig,
        dev: devConfig
      }
    };
  } else {
    return config;
  }
}
export {
  createDevServer,
  defineConfig
};
