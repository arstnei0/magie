import Plugin from "./Plugin";
import { UserConfig as ViteConfig } from "vite";

export default interface MagieConfig {
    frontend?: boolean,
    plugins?: Plugin | Plugin[],
    backend?: {
        entry?: string,
    },
    vite?: ViteConfig,
    server?: {
        port?: number
    },
    __MagieVite?: ViteConfig,
};