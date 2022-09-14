import MagieConfig from './types/MagieConfig';
import { createDevServer } from './server/index'

export function defineConfig(config : MagieConfig) : MagieConfig {
    return config;
}

export {
    MagieConfig,
    createDevServer,
}