'use client'

import PropertyForm from '@/components/property-form'
import { useAuth } from '@/context/auth'
import { propertyDataSchema } from '@/validation/propertySchema'
import { PlusCircleIcon } from 'lucide-react'
import z from 'zod'
import { saveNewProperty } from './actions'

export default function NewPropertyForm() {
  const auth = useAuth()

  async function handleSubmit(data: z.infer<typeof propertyDataSchema>) {
    const token = await auth?.currentUser?.getIdToken()

    if (!token) {
      console.log('User is not authenticated')
      return
    }

    const response = await saveNewProperty({ ...data, token })
    console.log('Property saved:', response)
  }

  return (
    <PropertyForm
      handleSubmit={handleSubmit}
      submitButtonLabel={
        <>
          <PlusCircleIcon />
          Create Property
        </>
      }
    />
  )
}
