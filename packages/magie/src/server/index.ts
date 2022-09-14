import MagieConfig from "../types/MagieConfig";
import { createServer as createViteServer } from 'vite'
import setConfig from "../setConfig";
import devPlugin from "../plugin/devPlugin";
import chalk from "chalk";

export async function createDevServer(config: MagieConfig) {
    setConfig(config);

    const viteServer = await createViteServer({
        ...config.__MagieVite,
        server: {
            port: config.server.port
        },
        plugins: [config.__MagieVite.plugins, devPlugin(config)]
    });

    viteServer.listen();

    console.log(chalk.red('✓ ') + chalk.green('Magie dev server starts successfully on port ') + chalk.blue(config.server.port) + chalk.green('!'))
}