import vue from '@vitejs/plugin-vue';

export default function pluginVue(options) {
    return {
        vite: {
            plugins: [vue(options)]
        }
    }
}