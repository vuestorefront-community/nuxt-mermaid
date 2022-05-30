import { defineNuxtConfig } from 'nuxt';
// eslint-disable-next-line import/no-unresolved,n/no-unpublished-import,import/no-relative-packages
import NuxtMermaid from '..';

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    [
      NuxtMermaid,
      {
        logLevel: 1,
      },
    ],
  ],
});
