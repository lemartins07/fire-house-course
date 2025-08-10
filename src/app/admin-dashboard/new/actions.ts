'use server'

import { auth, firestore } from '@/lib/firebase/server'
import { propertyDataSchema } from '@/validation/propertySchema'

type PropertyFormData = {
  address1: string
  address2?: string
  city: string
  postcode: string
  price: number
  description: string
  bedrooms: number
  bathrooms: number
  status: 'draft' | 'for-sale' | 'withdrawn' | 'sold'
}

export const createProperty = async (
  data: PropertyFormData,
  authToken: string,
) => {
  const verifiedToken = await auth.verifyIdToken(authToken)

  if (!verifiedToken) {
    return {
      error: true,
      message: 'Unauthorized',
    }
  }

  const validation = propertyDataSchema.safeParse(data)

  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0]?.message || 'Invalid property data',
    }
  }

  const property = await firestore.collection('properties').add({
    ...data,
    created: new Date(),
    updated: new Date(),
  })

  return {
    propertyId: property.id,
  }
}
