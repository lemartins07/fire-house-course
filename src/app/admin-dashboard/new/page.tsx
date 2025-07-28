import { Breadcrumbs } from '@/components/ui/breadcrumb'

export default function NewProperty() {
  const breadcrumbsItems = [
    { label: 'Dashboard', href: '/admin-dashboard' },
    { label: 'New Property' },
  ]
  return (
    <div>
      <Breadcrumbs items={breadcrumbsItems} />
      <h1>New Property</h1>
    </div>
  )
}
