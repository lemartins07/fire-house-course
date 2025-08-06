import { Breadcrumbs } from '@/components/ui/breadcrumb'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { getPropertyById } from '@/data/properties'
import NewPropertyForm from '../../new/new-property-form'

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
            href: '/admin-dashboar',
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
          <NewPropertyForm />
        </CardContent>
      </Card>
    </div>
  )
}
