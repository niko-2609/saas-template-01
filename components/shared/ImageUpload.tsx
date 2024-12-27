"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

interface ImageUploadProps {
  onUploadError: (error: string) => void
  getUploadUrl: (fileType: string) => Promise<{ url: string; fields: Record<string, string>; key: string }>
}

export function ImageUpload({ onUploadError, getUploadUrl }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      onUploadError('Please select an image file')
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      onUploadError('File size must be less than 10MB')
      return
    }

    setIsUploading(true)
    try {
      // Get presigned URL
      const { url, fields, key } = await getUploadUrl(file.type)
      if (!url || !fields) throw new Error('Failed to get upload URL')

      // Prepare form data for upload
      const formData = new FormData()
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value)
      })
      formData.append('file', file)

      // Upload to S3
      const uploadResponse = await fetch(url, {
        method: 'POST',
        body: formData,
      })

      if (!uploadResponse.ok) throw new Error('Upload failed')

      // Get the final image URL
      const imageUrl = `${process.env.NEXT_PUBLIC_CDN_URL}/${key}`
      return imageUrl
    } catch (error) {
      console.error('Upload error:', error)
      onUploadError('Failed to upload image')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />
      <Button
        type="button"
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
      >
        {isUploading ? <Spinner className="mr-2" size="sm" /> : null}
        {isUploading ? 'Uploading...' : 'Change Photo'}
      </Button>
    </>
  )
} 