import { UserConfig as ViteConfig, Plugin as VitePlugin } from 'vite';
import { Plugin as EsbuildPlugin } from 'esbuild';

export default interface Plugin extends VitePlugin {
    backendEsbuildPlugins?: EsbuildPlugin
};