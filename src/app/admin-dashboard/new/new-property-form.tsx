'use client'

import PropertyForm from '@/components/property-form'

export default function NewPropertyForm() {
  function handleSubmit(data: z.infer<typeof propertyDataSchema>) { }
  return <PropertyForm handleSubmit={handleSubmit} />
}
