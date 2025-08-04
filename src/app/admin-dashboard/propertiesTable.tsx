import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getProperties } from '@/data/properties'

export default async function PropertiesTable() {
  const { data, totalPages } = await getProperties({
    pagination: {
      pageSize: 2,
    },
  })
  console.log('Total pages: ', totalPages)
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
      </Table>
    </>
  )
}
