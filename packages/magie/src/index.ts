import MagieConfig from './types/MagieConfig';
import { createDevServer } from './server/index'
import start from './start';

export function defineConfig(config : MagieConfig) : MagieConfig {
    return config;
}

export {
    MagieConfig,
    createDevServer,
    start,
}