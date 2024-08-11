<script setup lang="ts">
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Option {
  label: string
  value: string
}

const { label, placeholder, options, value } = defineProps({
  label: String,
  ariaLabel: {
    type: String,
    require: true,
  },
  placeholder: String,
  options: {
    type: Object as PropType<Option[]>,
    required: true,
  },
  border: {
    type: Boolean,
    default: true,
  },
  value: String,
})

defineEmits(['update:modelValue'])
</script>

<template>
  <Label v-if="label" for="email" class="text-gray-400 mb-2">{{ label }}</Label>
  <Select
    :modelValue="value"
    @update:modelValue="$emit('update:modelValue', $event)"
    :aria-label="ariaLabel"
  >
    <SelectTrigger
      class="text-md ring-offset-white focus-visible:outline-none focus-visible:border-white focus-visible:ring-slate-950 focus-visible:ring-offset-2"
      :class="!border && 'border-transparent'"
      :aria-label="`${ariaLabel} Dropdown`"
    >
      <SelectValue :placeholder="placeholder" class="pr-2" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem
        v-for="(option, i) in options"
        :key="i"
        :value="option.value"
        class="font-sans"
      >
        {{ option.label }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>
