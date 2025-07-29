import { z } from 'zod'

export const propertyDataSchema = z.object({
  address1: z.string().min(1, 'Address line 1 is required'),
  address2: z.string().optional(),
  city: z.string().min(3, 'City must contain at least 3 characters'),
  postcode: z.string().refine((val) => {
    // simple regex for Brazilian postal codes
    return /^[0-9]{5}-[0-9]{3}$/.test(val)
  }, 'Invalid postcode format'),
  price: z.coerce.number().positive(),
  description: z
    .string()
    .min(10, 'Description must contain at least 10 characters'),
  bedrooms: z.coerce.number().int().min(0, 'At least 0 bedroom is required'),
  bathrooms: z.coerce.number().int().min(0, 'At least 0 bedroom is required'),
  status: z.enum(['draft', 'for-sale', 'withdrawn', 'sold']),
})
