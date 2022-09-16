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
}

declare function createDevServer(config: MagieConfig): Promise<void>;

declare function defineConfig(config: MagieConfig): MagieConfig;

export { MagieConfig, createDevServer, defineConfig };
