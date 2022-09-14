import MagieConfig from "../types/MagieConfig";
import { build as viteBuild } from "vite";
import setConfig from "../setConfig";
import chalk from "chalk";
import { build as esBuild } from 'esbuild';
import { resolve as pathResolve } from "path";
import { cwd as processCwd } from "process";

export default async function build(config: MagieConfig) {
    setConfig(config);

    console.log(chalk.blue('★ Magie build starts.'));

    if (config.frontend) {
        console.log(chalk.yellow('\nBuilding frontend...'));

        await viteBuild({
            ...config.__MagieVite,
            build: {
                outDir: 'dist/static'
            }
        });

        console.log(chalk.green('\n✔︎ Frontend has been build successfully!'))
    }

    console.log(chalk.yellow('\nBuilding backend...'));

    await esBuild({
        entryPoints: [config.frontend ?
            pathResolve(__dirname, 'build/standalone/frontend.ts') :
            pathResolve(__dirname, 'build/standalone/non-frontend.ts')
        ],
        platform: 'node',
        format: 'esm',
        bundle: true,
        plugins: [{
            name: 'magie/server',
            setup (build) {
                build.onResolve({ filter: /^\/virtual:magie-connect-handler$/ }, (args) => {
                    return {
                        path: pathResolve(processCwd(), config.backend.entry)
                    };
                });
            },
        }],
        outfile: pathResolve(processCwd(), 'dist/server.mjs'),
    });

    console.log(chalk.green('\n✔︎ Backend has been build successfully!'));
}