<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import { TabsTrigger, type TabsTriggerProps, useForwardProps } from "radix-vue";
import { cn } from "@/lib/utils";

const props = defineProps<
  TabsTriggerProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <TabsTrigger
    v-bind="forwardedProps"
    :class="
      cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md rounded-b-none px-4 py-2 text-sm font-medium ring-offset-white transition-all data-[state=active]:bg-grayLight data-[state=active]:text-white data-[state=inactive]:bg-[#1A1F28]',
        props.class
      )
    "
  >
    <slot />
  </TabsTrigger>
</template>
