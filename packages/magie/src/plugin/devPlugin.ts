import MagieConfig from "../types/MagieConfig";
import { UserConfig as ViteConfig, Plugin as VitePlugin } from "vite";

export default function devPlugin(config: MagieConfig) : VitePlugin[] {
    return [
        {
            name: '@magie/server',
            enforce: 'post',
            async configureServer (server) {
                server.middlewares.use(async (req, res, next) => {
                    const module = await server.ssrLoadModule(config.backend.entry);

                    module.default(req, res, next);
                });
            }
        }
    ]
}