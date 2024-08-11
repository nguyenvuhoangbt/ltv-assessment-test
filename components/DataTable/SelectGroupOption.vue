<script setup lang="ts">
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface GroupOption {
  name: string
  items: string[]
}

const { label, options } = defineProps({
  label: {
    type: String,
    require: true,
  },
  ariaLabel: {
    type: String,
    require: true,
  },
  placeholder: String,
  options: {
    type: Object as PropType<GroupOption[]>,
    required: true,
  },
})
</script>

<template>
  <Label for="email" class="text-gray-400 mb-2">{{ label }}</Label>
  <Select :aria-label="ariaLabel">
    <SelectTrigger class="text-md" :aria-label="`${ariaLabel} Dropdown`">
      <SelectValue :placeholder="placeholder" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup v-for="(group, i) in options" :key="i" class="font-sans">
        <SelectLabel class="text-md font-semibold pl-2">{{
          group.name
        }}</SelectLabel>
        <SelectItem v-for="(item, i) in group.items" :key="i" :value="item">
          {{ item }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
