import { UserConfig as ViteConfig, Plugin as VitePlugin } from 'vite';
import { Plugin as EsbuildPlugin } from 'esbuild';
import MagieConfig from './MagieConfig';

export default interface Plugin extends VitePlugin {
    backendEsbuildPlugins?: EsbuildPlugin,
    magieConfig?: (config: MagieConfig) => void | MagieConfig,
};