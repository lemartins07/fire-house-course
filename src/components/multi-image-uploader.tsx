'use client'

import { useRef } from 'react'
import { Button } from './ui/button'

export type ImageUpload = {
  id: string
  url: string
  file?: File
}

type MultiImageUploaderProps = {
  images?: ImageUpload[]
  onImagesChange: (images: ImageUpload[]) => void
}

export default function MultiImageUploader({
  images,
  onImagesChange,
}: MultiImageUploaderProps) {
  const uploadInputRef = useRef<HTMLInputElement | null>(null)

  console.log('MultiImageUploader', images)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])

    const newImages = files.map((file, index) => {
      return {
        id: `${Date.now()}-${index}-${file.name}`,
        url: URL.createObjectURL(file),
        file,
      }
    })

    onImagesChange([...newImages, ...(images || [])])
  }
  return (
    <div className="mx-auto w-full max-w-3xl p-4">
      <input
        className="hidden"
        type="file"
        accept="image/*"
        multiple
        ref={uploadInputRef}
        onChange={handleInputChange}
      />
      <Button type="button" onClick={() => uploadInputRef?.current?.click()}>
        Upload images
      </Button>
    </div>
  )
}
