interface Plugin {
    vite?: any;
}

interface MagieConfig {
    frontend?: boolean;
    plugins?: Plugin | Plugin[];
}

declare function createDevServer(config: MagieConfig): void;

declare function start(config: MagieConfig): void;

declare function defineConfig(config: MagieConfig): MagieConfig;

export { MagieConfig, createDevServer, defineConfig, start };
