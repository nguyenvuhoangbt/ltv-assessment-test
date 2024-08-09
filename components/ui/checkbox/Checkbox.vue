<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import type { CheckboxRootEmits, CheckboxRootProps } from "radix-vue";
import {
  CheckboxIndicator,
  CheckboxRoot,
  useForwardPropsEmits,
} from "radix-vue";
import { Check } from "lucide-vue-next";
import { cn } from "@/lib/utils";

const props = defineProps<
  CheckboxRootProps & { class?: HTMLAttributes["class"] }
>();
const emits = defineEmits<CheckboxRootEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <CheckboxRoot
    v-bind="forwarded"
    :class="
      cn(
        'peer size-5 shrink-0 rounded-full border-2 border-gray-400 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-slate-900 data-[state=checked]:text-gray-400',
        props.class
      )
    "
  >
    <CheckboxIndicator
      class="flex size-full items-center justify-center text-current"
    >
      <slot>
        <Check class="size-2.5 stroke-[5]" />
      </slot>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
