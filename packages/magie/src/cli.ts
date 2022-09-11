#!/usr/bin/env node --input-type=module
/// <reference types="node" />

import { start, MagieConfig } from '.';
import process, { config } from "process";
import { readFile, stat } from 'fs/promises';
import path from "path";
import chalk from "chalk";
import { program } from 'commander';
import { build } from 'esbuild';
import { loadConfigFromFile, ConfigEnv } from 'vite';

program.option('-c, --config <file>');
program.parse();
const cwd = process.cwd();
const options = program.opts();

let {
    config: configFile = 'magie.config.ts',
} = options;

(async () => {
    CheckFileExist : {
        const configFileFullPath = path.resolve(cwd, configFile);
        try {
            await stat(configFileFullPath);
        } catch (err) {
            console.error(chalk.red(`Magie config file '${configFile}' not detected!`));
            break CheckFileExist;
        }
        
        const targetConfigFilePath = path.resolve(cwd, './node_modules/.megia/config.mjs');
        const transformedConfigFileContent = await build({
            entryPoints: [configFileFullPath],
            outfile: targetConfigFilePath,
            format: 'esm',
            absWorkingDir: process.cwd(),
            platform: 'node'
        });

        const config : MagieConfig = (await import(targetConfigFilePath)).default;
        // const config = await loadConfigFromFile({
        //     command: 'serve',
        //     mode: 'dev',
        // }, configFile)

        start(config);
        // console.log(config.plugins?.[0].vite.plugins[0])
    }
})();