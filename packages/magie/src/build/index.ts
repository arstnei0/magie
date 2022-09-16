import MagieConfig from "../types/MagieConfig";
import { build as viteBuild } from "vite";
import setConfig from "../setConfig";
import chalk from "chalk";
import { build as esBuild } from 'esbuild';
import { resolve as pathResolve } from "path";
import { cwd as processCwd } from "process";
import Plugin from "../types/Plugin";
import buildPlugin from "../plugin/buildPlugin";
import writeOutput from "./write";

export default async function build(config: MagieConfig) {
    setConfig(config);

    console.log(chalk.blue('★ Magie build starts.'));

    if (config.frontend) {
        console.log(chalk.yellow('\nBuilding frontend...'));

        await viteBuild({
            ...config.vite,
            build: {
                outDir: 'dist/static'
            },
            plugins: [config.vite.plugins, config.plugins]
        });

        console.log(chalk.green('\n✔︎ Frontend has been build successfully!'))
    }

    console.log(chalk.yellow('\nBuilding backend...'));

    const esbuildPlugins = [];
    for (let plugin of [config.plugins].flat(100)) {
        if ((plugin as Plugin).backendEsbuildPlugins) esbuildPlugins.push((plugin as Plugin).backendEsbuildPlugins);
    }

    const fileContent = ((await viteBuild({
        ...config.vite,
        build: {
            ssr: config.frontend ?
                    pathResolve(__dirname, 'build/standalone/frontend.ts') :
                    pathResolve(__dirname, 'build/standalone/non-frontend.ts'),
            emptyOutDir: false,
            write: false,
        },
        ssr: {
            target: 'node',
            format: 'esm',
        },
        plugins: [config.vite.plugins, config.plugins, buildPlugin(config)],
    })) as any).output[0].code;

    const outFilePath = pathResolve(processCwd(), 'dist/server.mjs');
    console.log(chalk.yellow('Writing server file...'));
    await writeOutput(fileContent, outFilePath);

    console.log(chalk.green('\n✔︎ Backend has been build successfully!'));
}