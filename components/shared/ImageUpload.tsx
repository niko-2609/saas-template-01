"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { X } from "lucide-react"

interface ImageUploadProps {
  onUploadError: (error: string) => void
  onFileSelect: (file: File | null) => void
  selectedFile: File | null
  currentImageUrl?: string
}

export function ImageUpload({ 
  onUploadError, 
  onFileSelect, 
  selectedFile,
  currentImageUrl 
}: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Reset preview when selectedFile changes
  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null)
    }
  }, [selectedFile])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleClearSelection = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setPreviewUrl(null)
    onFileSelect(null)
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20 mb-2">
        <div className="relative w-20 h-20 rounded-full overflow-hidden">
          <Image 
            src={previewUrl || currentImageUrl || ''} 
            alt="Profile" 
            fill
            className="object-cover"
            priority
          />
        </div>
        {selectedFile && (
          <button
            onClick={handleClearSelection}
            className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1 hover:bg-red-600 transition-colors"
            type="button"
          >
            <X className="h-4 w-4 text-white" />
          </button>
        )}
      </div>
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
        className="mt-2"
      >
        {selectedFile ? 'Change Photo' : 'Select Photo'}
      </Button>
    </div>
  )
} 