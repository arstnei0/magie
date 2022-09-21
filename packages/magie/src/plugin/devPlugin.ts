import MagieConfig from "../types/MagieConfig";
import { UserConfig as ViteConfig, Plugin as VitePlugin } from "vite";

export default function devPlugin(config: MagieConfig) : VitePlugin[] {
    let sv;

    return [
        {
            name: '@magie/server',
            async configureServer (server) {
                sv = server;
                server.middlewares.use(async (req, res, next) => {
                    const module = await server.ssrLoadModule(config.backend.entry);

                    module.default(req, res, next);
                });

                (await server.ssrLoadModule(config.backend.entry))?.init?.();
            },
            async handleHotUpdate(ctx) {
                if (new RegExp(config.backend.entry).test(ctx.file)) {
                    (await sv.ssrLoadModule(config.backend.entry))?.init?.();
                }

                return ctx.modules;
            }
        }
    ]
}