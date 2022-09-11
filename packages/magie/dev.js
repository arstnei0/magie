import { build } from "tsup";

build({
    entry: ['src/cli.ts'],
    watch: true,
    outDir: 'bin',
    platform: 'node',
    noExternal: ['chalk'],
});

build({
    entry: ['src/index.ts'],
    watch: true,
    format: ['esm'],
    dts: true,
    external: ['vite']
});