'use client'

import PropertyForm from '@/components/property-form'
import { useAuth } from '@/context/auth'
import { propertyDataSchema } from '@/validation/propertySchema'
import { PlusCircleIcon } from 'lucide-react'
import z from 'zod'
import { createProperty } from './actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function NewPropertyForm() {
  const auth = useAuth()
  const router = useRouter()

  async function handleSubmit(data: z.infer<typeof propertyDataSchema>) {
    const token = await auth?.currentUser?.getIdToken()

    if (!token) {
      console.log('User is not authenticated')
      return
    }

    const response = await createProperty(data, token)

    if (response.error) {
      toast.error('Error!!', { description: response.error })
      return
    }

    toast.success('Success!!', {
      description: 'Property created!!',
    })

    router.push(`/admin-dashboard`)
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
