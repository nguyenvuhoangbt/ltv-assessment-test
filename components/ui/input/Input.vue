<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { useDebouncedRef } from '@/lib/debounce'

const props = defineProps<{
  modelValue?: string | number
  class?: HTMLAttributes['class']
  debounced?: number
}>()

const text = props.debounced
  ? useDebouncedRef(props.modelValue, props.debounced)
  : ref(props.modelValue)

const emit = defineEmits(['update:modelValue'])

watch(text, (value) => {
  emit('update:modelValue', value)
})

watch(() => props.modelValue, (value) => {
  text.value = value
})
</script>

<template>
  <input
    v-model="text"
    :class="
      cn(
        'flex h-10 w-full border-b border-gray-400 bg-transparent py-2 text-md ring-offset-white placeholder:text-gray-400/50 focus-visible:outline-none focus-visible:border-white focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        props.class
      )
    "
  />
</template>
