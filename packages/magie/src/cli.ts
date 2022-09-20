#!/usr/bin/env node
/// <reference types="node" />

import { MagieConfig, createDevServer } from '.';
import { cwd as processCwd } from "process";
import { readFile, stat } from 'fs/promises';
import { resolve as pathResolve } from "path";
import chalk from "chalk";
import { program } from 'commander';
import { build as esBuild } from 'esbuild';
import { loadConfigFromFile, ConfigEnv } from 'vite';
import build from './build';

program
    .name('magie')
    .description('A fullstack framework powered by vite.')
    .option('-c, --config <file>');

program
    .action(startDevServer);

let options;

async function getConfig(mode: 'build' | 'dev') {
    const cwd = processCwd();
    const {
        config: configFile = 'magie.config.ts'
    } = options;
    CheckFileExist : {
        const configFileFullPath = pathResolve(cwd, configFile);
        try {
            await stat(configFileFullPath);
        } catch (err) {
            console.error(chalk.red(`Magie config file '${configFile}' not detected!`));
            break CheckFileExist;
        }
        
        const targetConfigFilePath = pathResolve(cwd, './node_modules/.megia/config.mjs');
        const transformedConfigFileContent = await esBuild({
            entryPoints: [configFileFullPath],
            outfile: targetConfigFilePath,
            format: 'esm',
            absWorkingDir: processCwd(),
            platform: 'node',
            // bundle: true,
            // external: ['@magie/plugin-*']
        });

        const config : MagieConfig = (await import(targetConfigFilePath)).default;

        if (config.__magieDefineConfig) {
            return config.__magieDefineConfig[mode];
        }

        return config;
    }
}

async function startDevServer () {
    const config = await getConfig('dev');
    await createDevServer(config);
}

program.command('build')
    .action(async () => {
        const config = await getConfig('build');
        await build(config);
    });

program.command('prod')
    .alias('serve')
    .action(async () => {
        const cwd = processCwd();
        await import(pathResolve(cwd, 'dist/server.mjs'));
    });

options = program.opts();
program.parse();