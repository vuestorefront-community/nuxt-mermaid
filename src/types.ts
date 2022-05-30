import type mermaid from 'mermaid';

export type MermaidOptions = typeof mermaid.initialize extends (
  a: infer A,
) => any
  ? A
  : never;
