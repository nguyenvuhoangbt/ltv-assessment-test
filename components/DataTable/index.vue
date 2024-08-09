<script setup lang="ts">
import { h, ref } from 'vue'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type {
  ColumnFiltersState,
  ExpandedState,
  SortingState,
  VisibilityState,
} from '@tanstack/vue-table'
import {
  FlexRender,
  createColumnHelper,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table'

export interface ShippingNote {
  id: string
  shippingNotePreference: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

const data: ShippingNote[] = [
  {
    id: 'm5gr84i9',
    shippingNotePreference: 'GHABK381100001415',
    amount: 316,
    status: 'success',
    email: 'ken99@yahoo.com',
  },
]

const columnHelper = createColumnHelper<ShippingNote>()

const columns = [
  columnHelper.display({
    id: 'select',
    cell: ({ row }) => {
      return h(Checkbox, {
        'checked': row.getIsSelected(),
        'onUpdate:checked': value => row.toggleSelected(!!value),
        'ariaLabel': 'Select row',
      })
    },
  }),
  columnHelper.accessor('shippingNotePreference', {
    // enablePinning: true,
    header: 'Shipping Note Preference',
    cell: ({ row }) => h('div', { class: 'font-semibold' }, row.getValue('shippingNotePreference')),
  }),
  columnHelper.accessor('status', {
    enablePinning: true,
    header: 'Status',
    cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('status')),
  }),
  columnHelper.accessor('amount', {
    header: () => h('div', { class: 'text-right' }, 'Amount'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)

      return h('div', { class: 'text-right font-medium' }, formatted)
    },
  }),
  columnHelper.display({
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return h('div', { class: 'relative' }, h('div', {
        payment,
        onExpand: row.toggleExpanded,
      }))
    },
  }),
]

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})
const expanded = ref<ExpandedState>({})

const table = useVueTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  // getPaginationRowModel: getPaginationRowModel(),
  // getSortedRowModel: getSortedRowModel(),
  // getFilteredRowModel: getFilteredRowModel(),
  // getExpandedRowModel: getExpandedRowModel(),
  // state: {
    // get sorting() {
    //   return sorting.value
    // },
    // get columnFilters() {
    //   return columnFilters.value
    // },
    // get columnVisibility() {
    //   return columnVisibility.value
    // },
    // get rowSelection() {
    //   return rowSelection.value
    // },
    // get expanded() {
    //   return expanded.value
    // },
    // columnPinning: {
    //   left: ['status'],
    // },
  // },
})
</script>

<template>
  <div class="flex gap-10 flex-col">
    <DataTableFilterOption />

    <div class="flex justify-between">
      <DialogCreateNewShippingNote />

      <DataTablePagination :total="382" />
    </div>

    <Table>
      <TableHeader>
        <TableRow
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <TableHead
            v-for="header in headerGroup.headers"
            :key="header.id"
            :data-pinned="header.column.getIsPinned()"
            :class="
              cn(
                { 'sticky bg-background/95': header.column.getIsPinned() },
                header.column.getIsPinned() === 'left' ? 'left-0' : 'right-0'
              )
            "
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
              <TableCell
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
                :data-pinned="cell.column.getIsPinned()"
                :class="
                  cn(
                    {
                      'sticky bg-background/95': cell.column.getIsPinned(),
                    },
                    cell.column.getIsPinned() === 'left' ? 'left-0' : 'right-0'
                  )
                "
              >
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
