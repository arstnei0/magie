import { Plugin as Plugin$1, UserConfig } from 'vite';

interface Plugin {
    vitePlugins?: Plugin$1 | Plugin$1[];
}

interface MagieConfig {
    frontend?: boolean;
    plugins?: Plugin | Plugin[];
    backend?: {
        entry?: string;
    };
    vite?: UserConfig;
    server?: {
        port?: number;
    };
}

declare function createDevServer(config: MagieConfig): Promise<void>;

declare function defineConfig(config: MagieConfig): MagieConfig;

export { MagieConfig, createDevServer, defineConfig };
