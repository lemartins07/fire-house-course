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
  token: string
}

export const saveNewProperty = async (data: PropertyFormData) => {
  const { token, ...propertyData } = data
  const verifiedToken = await auth.verifyIdToken(token)

  if (!verifiedToken) {
    return {
      error: true,
      message: 'Unauthorized',
    }
  }

  const validation = propertyDataSchema.safeParse(propertyData)

  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0]?.message || 'Invalid property data',
    }
  }

  const property = await firestore.collection('properties').add({
    ...propertyData,
    created: new Date(),
    updated: new Date(),
  })

  return {
    propertyId: property.id,
  }
}
