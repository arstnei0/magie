import MagieConfig from "../types/MagieConfig";
import { build as viteBuild } from "vite";
import setConfig from "../setConfig";
import buildPlugin from "../plugin/buildPlugin";
import chalk from "chalk";

export default async function build(config: MagieConfig) {
    setConfig(config);

    console.log(chalk.blue('★ Magie build starts.'));

    if (config.frontend) {
        console.log(chalk.yellow('\nBuilding frontend...'));

        await viteBuild({
            ...config.vite,
            build: {
                outDir: 'dist/static'
            }
        });

        console.log(chalk.green('\n✔︎ Frontend has been build successfully!'))
    }

    console.log(chalk.yellow('\nBuilding backend...'));

    await viteBuild({
        ...config.vite,
        plugins: [config.vite.plugins, buildPlugin(config)],
        build: {
            emptyOutDir: false
        }
    });

    console.log(chalk.green('\n✔︎ Backend has been build successfully!'))
}