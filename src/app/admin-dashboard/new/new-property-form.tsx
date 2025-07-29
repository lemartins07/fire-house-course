'use client'

import PropertyForm from '@/components/property-form'
import { propertyDataSchema } from '@/validation/propertySchema'
import { PlusCircleIcon } from 'lucide-react'
import z from 'zod'

export default function NewPropertyForm() {
  function handleSubmit(data: z.infer<typeof propertyDataSchema>) {
    console.log('Form submitted with data:', data)
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
