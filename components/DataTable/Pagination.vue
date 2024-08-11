<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { paginationOptions } from './const'
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'

const { page, total } = defineProps({
  page: {
    type: Number,
    default: 1,
  },
  total: {
    type: Number,
    required: true,
  },
})

const currentPage = ref(page)
const itemPerPage = ref(10)

const getFromIndex = computed(() => {
  return (currentPage.value - 1) * itemPerPage.value + 1
})

const getToIndex = computed(() => {
  return Math.min(currentPage.value * itemPerPage.value, total)
})

watch(itemPerPage, () => {
  currentPage.value = 1
})
</script>

<template>
  <div
    class="flex flex-col items-center justify-between space-x-1 text-sm md:flex-row md:h-5"
  >
    <span class="flex items-center gap-4">
      <span>Size:</span>
      <div class="flex gap-4 items-center">
        <DataTableSelectOption
          aria-label="Size"
          :options="paginationOptions"
          :border="false"
          :value="itemPerPage.toString()"
          @update:modelValue="($event) => (itemPerPage = $event)"
        />
        <span class="whitespace-nowrap">{{
          `${getFromIndex} - ${getToIndex} of ${total}`
        }}</span>
      </div>
    </span>
    <Pagination
      v-model:page="currentPage"
      :total="total"
      :sibling-count="1"
      :items-per-page="itemPerPage"
      show-edges
    >
      <PaginationList v-slot="{ items }" class="flex items-center sm:gap-1">
        <PaginationFirst />
        <PaginationPrev />

        <template v-for="(item, index) in items">
          <PaginationListItem
            v-if="item.type === 'page'"
            :key="index"
            :value="item.value"
            as-child
          >
            <Button
              class="size-7 p-0"
              :class="
                item.value === currentPage
                  ? 'bg-blue-900 hover:bg-blue-900/50'
                  : 'bg-transparent'
              "
            >
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis v-else :key="item.type" :index="index" />
        </template>

        <PaginationNext />
        <PaginationLast />
      </PaginationList>
    </Pagination>

    <Separator orientation="vertical"  class="hidden md:block"/>

    <Button aria-label="list" class="bg-transparent scale-75">
      <i class="icon icon-list-solid scale-75" />
    </Button>
  </div>
</template>
