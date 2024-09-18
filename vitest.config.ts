import { defineConfig as defineVitestConfig } from 'vitest/config';

export default defineVitestConfig({
    test: {
        globals: true,
        testTimeout: 10000,
        environment: 'jsdom',
    },
});
