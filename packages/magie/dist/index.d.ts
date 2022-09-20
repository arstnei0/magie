import { Plugin as Plugin$1, UserConfig } from 'vite';
import { Plugin as Plugin$2 } from 'esbuild';

interface Plugin extends Plugin$1 {
    backendEsbuildPlugins?: Plugin$2;
    magieConfig?: (config: MagieConfig) => void | MagieConfig;
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
    __MagieVite?: UserConfig;
    __magieDefineConfig?: {
        build?: MagieConfig;
        dev?: MagieConfig;
    };
    define?: object;
}

declare function createDevServer(config: MagieConfig): Promise<void>;

declare type configFunction = (mode: 'build' | 'dev') => MagieConfig;
declare function defineConfig(config: MagieConfig | configFunction): MagieConfig;

export { MagieConfig, createDevServer, defineConfig };
