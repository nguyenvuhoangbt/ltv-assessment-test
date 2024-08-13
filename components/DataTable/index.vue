<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  getFilteredRowModel,
} from '@tanstack/vue-table'
import { getColumns } from '@/composables/DataTable/useColumns'
import { transformData } from '@/composables/DataTable/useGetData'
import {
  type DataResponse,
  type rowDataTable,
} from '@/composables/DataTable/useGetData'

const isLoading = ref(true)
const columns = getColumns()
const table = ref()

const initialFilter = {
  shippingNote: null,
  status: null,
}
const filter = ref(initialFilter)

const { data, status } = await useLazyAsyncData(
  `getData`,
  () => $fetch<DataResponse>('/api/get-data-table'),
  { server: false }
)

watch(status, () => {
  if (status.value !== 'pending') {
    isLoading.value = false
  }
  if (status.value === 'success') {
    const { rows } = transformData(data.value)
    handleDataTable(rows)
  }
})

watch(
  () => filter.value.shippingNote,
  (value: string) => {
    table.value.getColumn('reference')?.setFilterValue(value)
  }
)

watch(
  () => filter.value.status,
  (value: string) => {
    table.value.getColumn('status')?.setFilterValue(value)
  }
)

const handleDataTable = (data: rowDataTable[]) => {
  table.value = useVueTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })
}

const clearFilter = () => {
  filter.value.shippingNote = null
  filter.value.status = null
}
</script>

<template>
  <div class="flex gap-6 flex-col md:gap-10">
    <DataTableFilterOption
      :shipping-note="filter.shippingNote"
      :status="filter.status"
      @update:shipping-note="(value) => (filter.shippingNote = value)"
      @update:status="(value) => (filter.status = value)"
      @update:clear-filter="clearFilter"
    />

    <div
      class="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center"
    >
      <DialogCreateNewShippingNote />

      <DataTablePagination
        v-if="!isLoading"
        :total="data.totalElements"
        :size="data.pageable.pageSize"
      />
    </div>

    <div v-if="isLoading" class="h-full flex-center">
      <LoadingSpinner />
    </div>

    <Table v-else>
      <TableHeader>
        <TableRow
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <TableHead
            v-for="header in headerGroup.headers"
            :key="header.id"
            class="font-bold"
          >
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow v-if="isLoading">
          <TableCell :colspan="columns.length" class="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>

        <template v-else>
          <template v-if="table.getRowModel().rows?.length">
            <template v-for="row in table.getRowModel().rows" :key="row.id">
              <TableRow :data-state="row.getIsSelected() && 'selected'">
                <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                  <FlexRender
                    :render="cell.column.columnDef.cell"
                    :props="cell.getContext()"
                  />
                </TableCell>
              </TableRow>
              <TableRow v-if="row.getIsExpanded()">
                <TableCell :colspan="row.getAllCells().length">
                  {{ row.original }}
                </TableCell>
              </TableRow>
            </template>
          </template>

          <TableRow v-else>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>
</template>
