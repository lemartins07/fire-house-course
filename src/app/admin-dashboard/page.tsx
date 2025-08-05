import { Breadcrumbs } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { PlusCircleIcon } from 'lucide-react'
import Link from 'next/link'
import PropertiesTable from './propertiesTable'

type AdminDashboardProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchParams?: Promise<any>
}

export default async function AdminDashboard({
  searchParams,
}: AdminDashboardProps) {
  const searchParamsValue = await searchParams
  const parsedPageParams = searchParamsValue
    ? parseInt(searchParamsValue?.page)
    : 1

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Dashboard' }]} />
      <h1 className="mt-6 text-4xl font-bold">Admin Dashboard</h1>
      <Button asChild className="mt-4 inline-flex gap-2 pl-2">
        <Link href="/admin-dashboard/new">
          <PlusCircleIcon /> New Property
        </Link>
      </Button>

      <PropertiesTable page={parsedPageParams} />
    </div>
  )
}
