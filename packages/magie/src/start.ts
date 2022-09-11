import MagieConfig from "./types/MagieConfig";
import Plugin from "./types/Plugin";
import { createDevServer } from './server/index'

function parsePlugins(plugins?: Plugin | Plugin[]) {
    let result = [plugins].flat(1000);
    return result;
}

export default function start(config: MagieConfig) {
    // parsePlugins(config.plugins);
    createDevServer(config);
}