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
  return (
    <div className="mx-auto w-full max-w-3xl p-4">
      <input
        className="hidden"
        type="file"
        accept="image/*"
        ref={uploadInputRef}
      />
      <Button type="button" onClick={() => uploadInputRef?.current?.click()}>
        Upload images
      </Button>
    </div>
  )
}
