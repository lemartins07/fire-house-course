import PropertyStatusBadge from '@/components/property-status-badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getProperties } from '@/data/properties'
import { EyeIcon, PencilIcon } from 'lucide-react'
import Link from 'next/link'
import numeral from 'numeral'

type PropertiesTableProps = {
  page?: number
}

export default async function PropertiesTable({ page }: PropertiesTableProps) {
  const { data, totalPages } = await getProperties({
    pagination: {
      page,
      pageSize: 5,
    },
  })
  return (
    <>
      {!data && (
        <h1 className="py-20 text-center text-3xl font-bold text-zinc-400">
          You have no data.
        </h1>
      )}
      <Table className="mt-6">
        <TableHeader>
          <TableRow>
            <TableHead>Address</TableHead>
            <TableHead>Listing Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((property) => {
            const address = [
              property.address1,
              property?.address2,
              property.city,
              property.postcode,
            ]
              .filter((addressLine) => !!addressLine)
              .join(', ')
            return (
              <TableRow key={property.id}>
                <TableCell className="font-medium">{address}</TableCell>
                <TableCell className="font-medium">
                  {numeral(property.price).format('$0,0')}
                </TableCell>
                <TableCell className="font-medium">
                  {<PropertyStatusBadge status={property.status} />}
                </TableCell>
                <TableCell className="flex justify-end gap-1 font-medium">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/property/${property.id}`}>
                      <EyeIcon />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin-dashboard/edit/${property.id}`}>
                      <PencilIcon />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              {Array.from({ length: totalPages }).map((_, i) => (
                <Button
                  key={i}
                  disabled={page === i + 1}
                  asChild={page !== i + 1}
                  variant="outline"
                  className="mx-1"
                >
                  <Link href={`/admin-dashboard?page=${i + 1}`}>{i + 1}</Link>
                </Button>
              ))}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  )
}
