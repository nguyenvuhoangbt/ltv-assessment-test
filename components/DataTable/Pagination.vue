<script setup lang="ts">
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
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { paginationOptions } from './const'

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
  return  (currentPage.value - 1) * itemPerPage.value + 1
})

const getToIndex = computed(() => {
  return Math.min(currentPage.value * itemPerPage.value, total)
})

watch(itemPerPage, () => {
  currentPage.value = 1
})
</script>

<template>
  <div class="flex h-5 items-center space-x-1 text-sm">
    <span class="flex items-center gap-4">
      <span>Size:</span>
      <DataTableSelectOption
        :options="paginationOptions"
        :border="false"
        :value="itemPerPage.toString()"
        @update:modelValue="($event) => (itemPerPage = $event)"
      />
      <span class="whitespace-nowrap">{{
        `${getFromIndex} - ${getToIndex} of ${total}`
      }}</span>
    </span>
    <Pagination
      v-model:page="currentPage"
      :total="total"
      :sibling-count="2"
      :items-per-page="itemPerPage"
      show-edges
    >
      <PaginationList v-slot="{ items }" class="flex items-center gap-1">
        <template v-if="currentPage > 1">
          <PaginationFirst />
        </template>
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
        <PaginationLast v-if="currentPage < total / 10" />
      </PaginationList>
    </Pagination>

    <Separator orientation="vertical" />

    <Button aria-label="list" class="bg-transparent scale-75">
      <i class="icon icon-list-solid scale-75" />
    </Button>
  </div>
</template>
