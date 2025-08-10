import { Breadcrumbs } from '@/components/ui/breadcrumb'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { getPropertyById } from '@/data/properties'
import EditPropertyForm from './edit-property-form'

type EditPropertyProps = {
  params: Promise<{ propertyId: string }>
}

export default async function EditProperty({ params }: EditPropertyProps) {
  const { propertyId } = await params

  const property = await getPropertyById(propertyId)

  console.log(property)

  return (
    <div>
      <Breadcrumbs
        items={[
          {
            href: '/admin-dashboard',
            label: 'Dashboard',
          },
          {
            label: 'Edit Property',
          },
        ]}
      />

      <Card className="mt-5">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Edit Property</CardTitle>
        </CardHeader>
        <CardContent>
          <EditPropertyForm
            id={property.id}
            address1={property.address1}
            address2={property.address2}
            bathrooms={property.bathrooms}
            bedrooms={property.bedrooms}
            city={property.city}
            description={property.description}
            postcode={property.postcode}
            price={property.price}
            status={property.status}
          />
        </CardContent>
      </Card>
    </div>
  )
}
