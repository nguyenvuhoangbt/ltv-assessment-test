<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table'
import {
  getColumns,
  type ShippingNote,
} from '@/composables/DataTable/useColumns'
import { transformData } from '@/composables/API/useGetData'
import SwappingSquaresSpinner from '../ui/loading/SwappingSquaresSpinner.vue'

const isLoading = ref(true)
const rows = ref<ShippingNote[]>([])

const columns = getColumns()
const table = ref()
const posts = ref([])

const id = useId()
interface DataResponse {
  content: {
    id: string
    reference: string
    operation: {
      name: string
      [key: string]: any
    }
    principalName: string
    status: 'PAID' | 'DEPARTED' | 'ARRIVED' | 'EXITED' | 'LATE'
    officeDeparture: {
      code: string
      [key: string]: any
    }
    officeDestination: {
      code: string
      [key: string]: any
    }
    submittedDate: string
    departureDateTime: string
    estimatedArrivalDate: string
    createdDate: string
  }[]
  pageable: {
    pageSize: number
    [key: string]: any
  }
  totalPages: number
  totalElements: number
}
const { data, status } = await useLazyAsyncData<DataResponse>(
  `getData-${id}`,
  () => $fetch('/api/get-data-table'),
  { server: false }
)

watch(status, () => {
  if(status.value === 'success') {
    isLoading.value = false
    handleDataTable(transformData(data.value).rows)
  }
})

const handleDataTable = (data: any) => {
  table.value = useVueTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
}

handleDataTable([])
</script>

<template>
  <div class="flex gap-6 flex-col h-full md:gap-10">
    <DataTableFilterOption />

    <div
      class="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center"
    >
      <DialogCreateNewShippingNote />

      <DataTablePagination :total="382" />
    </div>

    <div v-if="isLoading" class="h-full flex-center">
      <SwappingSquaresSpinner />
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
      </TableBody>
    </Table>
  </div>
</template>
