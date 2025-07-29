import { Breadcrumbs } from '@/components/ui/breadcrumb'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import NewPropertyForm from './new-property-form'

export default function NewProperty() {
  const breadcrumbsItems = [
    { label: 'Dashboard', href: '/admin-dashboard' },
    { label: 'New Property' },
  ]
  return (
    <div>
      <Breadcrumbs items={breadcrumbsItems} />
      <Card className="mt-5">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">New Property</CardTitle>
        </CardHeader>
        <CardContent>
          <NewPropertyForm />
        </CardContent>
      </Card>
    </div>
  )
}
