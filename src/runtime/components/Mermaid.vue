<template>
  <div ref="$element">
    {{ renderGraph }}
  </div>
</template>

<script setup lang="ts">
  import { nanoid } from 'nanoid';
  import dedent from 'dedent';
  import {
    computed,
    onBeforeUnmount,
    onMounted,
    ref,
    useNuxtApp,
    useSlots,
    watch,
  } from '#imports';
  import Mermaid from 'mermaid/dist/mermaid.min';
  import { MermaidOptions } from '../../types';

  const properties = defineProps<{
    value: string;
    options?: MermaidOptions;
  }>();

  const { $config } = useNuxtApp();

  const $element = ref<HTMLDivElement>();

  const id = computed(() => nanoid());
  const slots = useSlots();
  const content = computed<string | string[]>(
    () => properties.value || slots.default().map((n) => `${n.children}`),
  );

  const normalize = (s: string) =>
    dedent(s.replace(/^(\s*click\s+\S+\s*)$/gm, `$1 mermaidClick_${id.value}`));

  const renderGraph = computed(() => {
    return Array.isArray(content.value)
      ? content.value.map((c) => normalize(c)).shift()
      : normalize(content.value);
  });

  const update = () => {
    if (typeof window !== 'undefined') {
      delete $element.value.dataset.processed;

      $element.value.replaceChild(
        document.createTextNode(renderGraph.value),
        $element.value.firstChild,
      );

      Mermaid.init(renderGraph.value, $element.value);
    }
  };

  onMounted(() => {
    if (typeof window !== 'undefined') {
      Mermaid.initialize({
        securityLevel: 'loose',
        startOnLoad: false,
        ...$config?.mermaid,
        ...properties?.options,
      });
    }
    return update();
  });

  onBeforeUnmount(() => {
    delete window[`mermaidClick_${id.value}`];
  });

  watch(
    computed(() => renderGraph.value),
    () => {
      update();
    },
  );
</script>
