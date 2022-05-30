import { resolve, join } from 'node:path';
import { defineNuxtModule, addComponent } from '@nuxt/kit';
import defu from 'defu';
import { MermaidOptions } from './types';

export { MermaidOptions as ModuleOptions } from './types';
export type ModulePublicRuntimeConfig = MermaidOptions;

declare module '@nuxt/schema' {
  interface ConfigSchema {
    runtimeConfig: {
      public?: {
        mermaid?: ModulePublicRuntimeConfig;
      };
    };
  }
}

export default defineNuxtModule<MermaidOptions>({
  meta: {
    name: '@vue-storefront/nuxt-mermaid',
    configKey: 'mermaid',
  },
  defaults: {
    darkMode: false,
    startOnLoad: false,
  },
  async setup(options, nuxt) {
    nuxt.options.runtimeConfig.public.mermaid = defu(
      nuxt.options.runtimeConfig.public.mermaid,
      {
        ...options,
      },
    );

    // Add Vite configurations
    if (nuxt.options.vite !== false) {
      nuxt.options.vite = defu(
        nuxt.options.vite === true ? {} : nuxt.options.vite,
        {
          optimizeDeps: {
            include: ['mermaid'],
          },
        },
      );
    }
    // Register components
    await addComponent({
      filePath: resolve(
        join(__dirname, 'runtime', 'components', 'Mermaid.vue'),
      ),
      mode: 'client',
      name: 'Mermaid',
      global: true,
    });

    nuxt.hook('prepare:types', (o) => {
      o.references.push({
        path: resolve(nuxt.options.buildDir, 'types/content.d.ts'),
      });
    });
  },
});
