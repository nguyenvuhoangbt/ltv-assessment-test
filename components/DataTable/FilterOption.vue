<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { groupOptions, statusOptions } from './const'
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex items-center">
      <label
        for="advanced-search"
        class="text-sm font-medium leading-none capitalize pr-6 text-gray-400"
      >
        Advanced search
      </label>
      <Checkbox id="advanced-search" />
    </div>

    <div class="flex gap-6">
      <div class="grid w-full max-w-sm items-center gap-1.5">
        <Label for="note" class="text-gray-400 mb-2"
          >Shipping Note Reference</Label
        >
        <Input id="note" type="note" placeholder="Enter value" />
      </div>

      <DataTableSelectGroupOption
        label="Departure Office"
        placeholder="57 items available"
        :options="groupOptions"
      />

      <DataTableSelectGroupOption
        label="Destination Office"
        placeholder="57 items available"
        :options="groupOptions"
      />

      <DataTableSelectOption
        label="Status"
        placeholder="9 items available"
        :options="statusOptions"
      />

      <div class="flex items-center gap-1">
        <Button
          aria-label="expand"
          class="scale-[0.9] bg-gray-700/40 hover:bg-gray-700/70"
        >
          <i class="icon icon-angles-down-solid scale-[0.7]" />
        </Button>
        <Button
          aria-label="filter"
          class="scale-[0.9] bg-gray-700/40 hover:bg-gray-700/70"
          disabled
        >
          <i class="icon icon-filter-circle-xmark-solid scale-[0.8]" />
        </Button>
      </div>
    </div>
  </div>
</template>
