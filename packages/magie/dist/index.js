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
  if (!config.__MagieVite)
    config.__MagieVite = {};
  if (!config.__MagieVite.plugins)
    config.__MagieVite.plugins = [];
  config.plugins = [config.plugins].flat();
  for (let plugin of config.plugins) {
    if (plugin.vite) {
      for (let i in plugin.vite) {
        if (i === "plugins")
          continue;
        config.__MagieVite[i] = plugin[i];
      }
      plugin.vite.plugins && config.__MagieVite.plugins.push(plugin.vite.plugins);
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
    ...config.__MagieVite,
    server: {
      port: config.server.port
    },
    plugins: [config.__MagieVite.plugins, devPlugin(config)]
  });
  viteServer.listen();
  console.log(chalk.red("\u2713 ") + chalk.green("Magie dev server starts successfully on port ") + chalk.blue(config.server.port) + chalk.green("!"));
}

// src/index.ts
function defineConfig(config) {
  return config;
}
export {
  createDevServer,
  defineConfig
};
