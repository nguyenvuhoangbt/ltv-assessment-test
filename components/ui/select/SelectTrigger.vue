<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  SelectIcon,
  SelectTrigger,
  type SelectTriggerProps,
  useForwardProps,
} from 'radix-vue'
import { ChevronDown } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<
  SelectTriggerProps & { class?: HTMLAttributes['class'] }
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectTrigger
    v-bind="forwardedProps"
    :class="
      cn(
        'flex h-10 w-full text-left items-center justify-between border-b text-white border-gray-400 bg-transparent py-2 text-sm focus-visible:outline-none [&>span]:line-clamp-1 data-[state=open]:border-b-white data-[placeholder]:text-gray-400/50 ring-offset-white focus-visible:border-white focus-visible:ring-slate-950 focus-visible:ring-offset-2',
        props.class
      )
    "
  >
    <slot />
    <SelectIcon as-child>
      <ChevronDown class="w-4 h-4 opacity-50" />
    </SelectIcon>
  </SelectTrigger>
</template>
