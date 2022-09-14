import { UserConfig as ViteConfig, Plugin as VitePlugin } from "vite";
import { resolve as pathResolve } from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export default function buildPlugin(config) : VitePlugin[] {
    return [
        {
            name: '@magie/build',
            enforce: 'pre',
            async resolveId (id) {
                if (id === "/virtual:magie-connect-handler") {
                    return this.resolve(config.backend.entry);
                } else if (id === '/virtual:magie-connect-server') {
                    if (config.frontend) {
                        return pathResolve(__dirname, 'build/standalone/frontend.ts');
                    } else {
                        return pathResolve(__dirname, 'build/standalone/non-frontend.ts');
                    }
                }
            },
            config() {
                return {
                    build: {
						rollupOptions: {
							input: "/virtual:magie-connect-server",
                            external: ['http'],
                            output: {
                                format: 'esm',
                                entryFileNames: 'server.js',
                            },
						},
                        assetsDir: '.',
                        minify: false
					},
                };
            },
        },
    ];
}