import { UserConfig } from 'vite';

interface Plugin {
    vite?: UserConfig;
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
