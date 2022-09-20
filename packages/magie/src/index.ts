import MagieConfig from './types/MagieConfig';
import { createDevServer } from './server/index'

type configFunction = (mode: 'build' | 'dev') => MagieConfig;

export function defineConfig(config : MagieConfig | configFunction) : MagieConfig {
    if (typeof config === 'function') {
        const buildConfig = config('build');
        const devConfig = config('dev');

        return {
            __magieDefineConfig: {
                build: buildConfig,
                dev: devConfig
            }
        }
    } else {
        return config;
    }

}

export {
    MagieConfig,
    createDevServer,
}