'server only'

import { firestore } from '@/lib/firebase/server'
import { PropertyStatus } from '@/types/propertyStatus'

type GetPropertiesOptions = {
  filters?: {
    minPrice?: number | null
    maxPrice?: number | null
    minBedrooms?: number | null
    status: PropertyStatus[] | null
  }
  pagination?: {
    pageSize?: number
    page?: number
  }
}

export const getProperties = async (options?: GetPropertiesOptions) => {
  const pageSize = options?.pagination?.pageSize || 10
  const page = options?.pagination?.page || 1
  const { status, maxPrice, minBedrooms, minPrice } = options?.filters || {}

  let propertiesQuery = firestore
    .collection('properties')
    .orderBy('updated', 'desc')

  if (minPrice !== undefined && minPrice !== null) {
    propertiesQuery = propertiesQuery.where('price', '>=', minPrice)
  }

  if (maxPrice !== undefined && maxPrice !== null) {
    propertiesQuery = propertiesQuery.where('price', '<=', maxPrice)
  }

  if (minBedrooms !== undefined && minBedrooms !== null) {
    propertiesQuery = propertiesQuery.where('bedrooms', '>=', minBedrooms)
  }

  if (status) {
    propertiesQuery = propertiesQuery.where('status', 'in', status)
  }

  const propertiesSnapshot = await propertiesQuery
    .limit(pageSize)
    .offset((page - 1) * pageSize)
    .get()

  const properties = propertiesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  return { data: properties }
}
