# @vue-storefront/nuxt-Mermaid

[![npm](https://img.shields.io/npm/v/@vue-storefront/nuxt-mermaid)](https://npmjs.com/package/@vue-storefront/nuxt-mermaid)

> Use Mermaid.js Diagrams in Nuxt 3

This [Nuxt][1] plugin provides a global component wrapping [Mermaid.js][2].
The plugin is designed to work with Nuxt v3.

## Installation

You can install it with

```bash
yarn add -D @vue-storefront/nuxt-Mermaid
```

or

```bash
npm install --save-dev @vue-storefront/nuxt-Mermaid
```

## Usage

The recommended usage is to place your mermaidjs diagrams inside
a fenced code block with the language 'Mermaid':

    ```Mermaid
    sequenceDiagram
    Alice->John: Hello John, how are you?
    loop every minute
        John-->Alice: Great!
    end
    ```

[1]: https://v3.nuxtjs.org/
[2]: https://mermaidjs.github.io