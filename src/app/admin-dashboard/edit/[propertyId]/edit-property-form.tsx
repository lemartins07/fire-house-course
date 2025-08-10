'use client'

import PropertyForm from '@/components/property-form'
import { auth } from '@/lib/firebase/client'
import { Property } from '@/types/property'
import { propertyDataSchema } from '@/validation/propertySchema'
import { SaveIcon } from 'lucide-react'
import z from 'zod'
import { updateProperty } from './actions'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type Props = Property

export default function EditPropertyForm({
  id,
  address1,
  address2,
  bathrooms,
  bedrooms,
  city,
  description,
  postcode,
  price,
  status,
}: Props) {
  const router = useRouter()

  const handleSumbmit = async (data: z.infer<typeof propertyDataSchema>) => {
    const token = await auth?.currentUser?.getIdToken()

    if (!token) {
      console.log('User is not authenticated')
      return
    }

    const reponse = await updateProperty({ id, ...data }, token)

    if (reponse?.error) {
      toast.error('Error!!', {
        description: reponse.message,
      })
      return
    }

    toast.success('Success!!', {
      description: 'Property created!!',
    })

    router.push('/admin-dashboard')
  }
  return (
    <div>
      <PropertyForm
        handleSubmit={handleSumbmit}
        submitButtonLabel={
          <>
            <SaveIcon /> Save Property
          </>
        }
        defaultValues={{
          address1,
          address2,
          bathrooms,
          bedrooms,
          city,
          description,
          postcode,
          price,
          status,
        }}
      />
    </div>
  )
}
