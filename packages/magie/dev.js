import { build } from "tsup";
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const define = {
    __dirname: `"${path.resolve(__dirname, 'src')}"`
};

build({
    entry: ['src/cli.ts'],
    watch: true,
    outDir: 'bin',
    platform: 'node',
    noExternal: ['chalk'],
    define,
});

build({
    entry: ['src/index.ts'],
    watch: true,
    format: ['esm'],
    dts: true,
    external: ['vite'],
    define,
});