'use client'

import PropertyForm from '@/components/property-form'
import { Property } from '@/types/property'
import { propertyDataSchema } from '@/validation/propertySchema'
import { SaveIcon } from 'lucide-react'
import z from 'zod'

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
  const handleSumbmit = async (data: z.infer<typeof propertyDataSchema>) => {
    console.log(data, id)
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
