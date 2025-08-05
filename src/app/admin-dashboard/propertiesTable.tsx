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
import Link from 'next/link'

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
                <TableCell className="font-medium">{property.price}</TableCell>
                <TableCell className="font-medium">{property.status}</TableCell>
                <TableCell className="font-medium">view / edit</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              {Array.from({ length: totalPages }).map((_, i) => (
                <Button key={i} asChild variant="outline" className="mx-1">
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
