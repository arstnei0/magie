import MagieConfig from "./types/MagieConfig";

export default function setConfig(config: MagieConfig) {
    if (!config.vite) config.vite = {};
    if (!config.frontend) config.frontend = true;
    if (!config.backend) config.backend = {};
    if (!config.backend.entry) config.backend.entry = 'src/index.ts';
    if (!config.vite.plugins) config.vite.plugins = [];
    if (!config.server) config.server = {};
    if (!config.server.port) config.server.port = 3001;
    if (!config.plugins) config.plugins = [];
    
    // config.plugins = [config.plugins].flat();
    // for (let plugin of config.plugins) {
    //     if (plugin.vite) {
    //         for (let i in plugin.vite) {
    //             if (i === 'plugins') continue;
    //             config.__MagieVite[i] = plugin[i];
    //         }
            
    //         plugin.vite.plugins && config.__MagieVite.plugins.push(plugin.vite.plugins);
    //     }
    // }
}