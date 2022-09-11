// src/server/index.ts
function createDevServer(config) {
}

// src/start.ts
function start(config) {
  createDevServer(config);
}

// src/index.ts
function defineConfig(config) {
  return config;
}
export {
  createDevServer,
  defineConfig,
  start
};
