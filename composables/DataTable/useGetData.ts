type Status = 'PAID' | 'DEPARTED' | 'ARRIVED' | 'EXITED' | 'LATE'

export interface DataResponse {
  content: {
    id: string
    reference: string
    operation: {
      name: string
      [key: string]: any
    }
    principalName: string
    status: Status
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

export type rowDataTable = {
  id: string
  reference: string
  status: Status
  operation: string
  principalName: string
  officeDeparture: string
  officeDestination: string
  submittedDate: string
  departureDateTime: string
  estimatedArrivalDate: string
}

export const transformData = (data: DataResponse) => {
  const rows: rowDataTable[] = data.content.map(
    ({
      id,
      reference,
      status,
      operation,
      principalName,
      officeDeparture,
      officeDestination,
      submittedDate,
      departureDateTime,
      estimatedArrivalDate,
    }) => ({
      id,
      reference,
      status,
      operation: operation.name,
      principalName,
      officeDeparture: officeDeparture.code,
      officeDestination: officeDestination.code,
      submittedDate,
      departureDateTime,
      estimatedArrivalDate,
    })
  )
  const size = data.pageable.pageSize
  const totalPages = data.totalPages
  const totalElements = data.totalElements

  return {
    rows,
    size,
    totalPages,
    totalElements,
  }
}
