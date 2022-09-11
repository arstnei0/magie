import { svelte as svelteVite } from '@sveltejs/vite-plugin-svelte';

export default function svelte(options) {
    return {
        vite: {
            plugins: [svelteVite(options)]
        }
    }
}