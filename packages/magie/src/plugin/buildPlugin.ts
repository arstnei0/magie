import { Plugin } from "vite";
import MagieConfig from "../types/MagieConfig";
import { resolve as pathResolve } from "path";
import { cwd as processCwd } from "process";

export default function buildPlugin(dirname:string, config: MagieConfig) : Plugin | Plugin[] {
    return [
        {
            name: 'magie-build',
            enforce: 'pre',
            resolveId(id) {
                if (id === '/virtual:magie-connect-handler') {
                    return pathResolve(processCwd(), config.backend.entry);
                }
            },
        }
    ];
}