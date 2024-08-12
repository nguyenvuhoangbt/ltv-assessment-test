import Button from '@/components/ui/button/Button.vue'
import { createColumnHelper } from '@tanstack/vue-table'
import { h } from 'vue'

interface ShippingNote {
  id: string
  reference: string
  status: 'PAID' | 'DEPARTED' | 'ARRIVED' | 'EXITED' | 'LATE'
  operation: string
  principalName: string
  officeDeparture: string
  officeDestination: string
  submittedDate: string
  departureDateTime: string
  estimatedArrivalDate: string
}

const formatDateString = (isoString: string) => {
  // Create a Date object from the ISO string
  const date = new Date(isoString)

  // Extract the components
  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const year = date.getUTCFullYear()

  let hours = date.getUTCHours()
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')
  const ampm = hours >= 12 ? 'pm' : 'am'

  // Convert hours to 12-hour format
  hours = hours % 12
  hours = hours ? hours : 12 // If hour is 0, set to 12

  const formattedHours = String(hours).padStart(2, '0')

  // Format the string
  return `${day}/${month}/${year} ${formattedHours}:${minutes} ${ampm}`
}

export const getColumns = () => {
  const columnHelper = createColumnHelper<ShippingNote>()

  return [
    {
      id: 'actions',
      cell: ({ row }) => {
        return h('div', { class: 'flex gap-2' }, [
          h(
            Button,
            {
              class:
                'bg-transparent scale-[0.7] brightness-50 hover:brightness-100',
            },
            () =>
              h('i', {
                class: 'icon icon-ellipsis-solid',
              })
          ),
          h(
            Button,
            {
              class:
                'bg-transparent scale-[0.7] brightness-50 hover:brightness-100',
            },
            () =>
              h('i', {
                class: 'icon icon-bookmark-regular',
              })
          ),
        ])
      },
    },
    columnHelper.accessor('reference', {
      header: 'Shipping Note Preference',
      cell: ({ row }) =>
        h('div', { class: 'font-semibold' }, row.getValue('reference')),
    }),
    columnHelper.accessor('status', {
      header: () => h('div', { class: 'text-center' }, 'Status'),
      cell: ({ row }) =>
        h(
          'div',
          {
            class: 'text-center',
          },
          h(
            'span',
            {
              class: `uppercase px-4 py-2 rounded-3xl select-none font-semibold ${
                ['PAID', 'ARRIVED', 'EXITED'].includes(row.getValue('status'))
                  ? 'bg-[#213C35] text-[#47DA85]'
                  : row.getValue('status') === 'DEPARTED'
                  ? 'bg-[#393226] text-[#F29E03]'
                  : 'bg-[#562D34] text-[#FF8484]'
              }`,
            },
            row.getValue('status')
          )
        ),
    }),
    columnHelper.accessor('operation', {
      header: 'Operation',
      cell: ({ row }) =>
        h(
          'div',
          { class: 'capitalize whitespace-nowrap' },
          row.getValue('operation')
        ),
    }),
    columnHelper.accessor('principalName', {
      header: 'Principle Name',
      cell: ({ row }) =>
        h(
          'div',
          { class: 'capitalize whitespace-nowrap' },
          row.getValue('principalName')
        ),
    }),
    columnHelper.accessor('officeDeparture', {
      header: 'Departure Office',
      cell: ({ row }) =>
        h(
          'div',
          { class: 'capitalize font-semibold' },
          row.getValue('officeDeparture')
        ),
    }),
    columnHelper.accessor('officeDestination', {
      header: 'Destination Office',
      cell: ({ row }) =>
        h(
          'div',
          { class: 'capitalize font-semibold' },
          row.getValue('officeDestination')
        ),
    }),
    columnHelper.accessor('submittedDate', {
      header: 'Submitted Date',
      cell: ({ row }) =>
        h(
          'div',
          { class: 'whitespace-nowrap' },
          formatDateString(row.getValue('submittedDate'))
        ),
    }),
    columnHelper.accessor('departureDateTime', {
      header: 'Departure Date',
      cell: ({ row }) =>
        h(
          'div',
          { class: 'whitespace-nowrap' },
          formatDateString(row.getValue('departureDateTime'))
        ),
    }),
    columnHelper.accessor('estimatedArrivalDate', {
      header: () => h('div', { class: 'text-center' }, 'Scheduled Date Time'),
      cell: ({ row }) =>
        h(
          'div',
          { class: 'text-center whitespace-nowrap' },
          formatDateString(row.getValue('estimatedArrivalDate'))
        ),
    }),
  ]
}
