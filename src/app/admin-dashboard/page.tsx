import { Breadcrumbs } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { PlusCircleIcon } from 'lucide-react'
import Link from 'next/link'
import PropertiesTable from './propertiesTable'

export default async function AdminDashboard() {
  return (
    <div>
      <Breadcrumbs items={[{ label: 'Dashboard' }]} />
      <h1 className="mt-6 text-4xl font-bold">Admin Dashboard</h1>
      <Button asChild className="mt-4 inline-flex gap-2 pl-2">
        <Link href="/admin-dashboard/new">
          <PlusCircleIcon /> New Property
        </Link>
      </Button>

      <PropertiesTable />
    </div>
  )
}
