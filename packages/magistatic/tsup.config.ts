import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    watch: true,
    dts: true,
    format: 'esm'
})