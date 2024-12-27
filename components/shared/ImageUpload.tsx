"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ImageUploadProps {
  onUploadError: (error: string) => void
  onFileSelect: (file: File) => void
  selectedFile: File | null
}

export function ImageUpload({ onUploadError, onFileSelect, selectedFile }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
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

    // Create preview URL
    const preview = URL.createObjectURL(file)
    setPreviewUrl(preview)
    onFileSelect(file)
  }

  // Cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  return (
    <div className="flex flex-col items-center gap-4">
      {previewUrl && (
        <div className="relative w-20 h-20 rounded-full overflow-hidden">
          <Image src={previewUrl} alt="Preview" className="w-full h-full object-cover" height={80} width={80}/>
        </div>
      )}
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
      >
        {selectedFile ? 'Change Photo' : 'Select Photo'}
      </Button>
    </div>
  )
} 