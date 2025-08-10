'use server'

import { auth, firestore } from '@/lib/firebase/server'
import { Property } from '@/types/property'
import { propertyDataSchema } from '@/validation/propertySchema'

export const updateProperty = async (data: Property, authToken: string) => {
  const { id, ...propertyData } = data
  const verifiedToken = await auth.verifyIdToken(authToken)

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

  await firestore
    .collection('properties')
    .doc(id)
    .update({
      ...propertyData,
      updated: new Date(),
    })
}
