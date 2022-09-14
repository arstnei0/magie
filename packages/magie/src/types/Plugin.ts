import { UserConfig as ViteConfig, Plugin as VitePlugin } from 'vite';

export default interface Plugin {
    vite?: ViteConfig;
};