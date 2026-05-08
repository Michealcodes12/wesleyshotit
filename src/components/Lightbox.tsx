'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Share2, Download, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface LightboxProps {
  image: string
  onClose: () => void
}

export function Lightbox({ image, onClose }: LightboxProps) {
  const [copied, setCopied] = useState(false)

  const shareCaption = `Obsessed with this shot! 📸🔥 Looking for a wedding photographer? Check out Wesleyshotit's gallery here: ${window.location.href}`

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Wesleyshotit Photography',
          text: shareCaption,
          url: window.location.href,
        })
      } catch (err) {
        console.error('Error sharing:', err)
      }
    } else {
      handleCopy()
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shareCaption)
    setCopied(true)
    toast.success('Caption copied to clipboard! You can now paste it on Instagram.')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = async () => {
    try {
      const response = await fetch(image)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `wesleyshotit-${Date.now()}.webp`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      toast.success('Image download started.')
    } catch (err) {
      toast.error('Failed to download image.')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10"
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
      >
        <X size={32} strokeWidth={1} />
      </button>

      <div className="relative w-full max-w-5xl h-full max-h-[80vh]">
        <Image
          src={image}
          alt="Gallery Image"
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/5 backdrop-blur-md px-6 py-4 border border-white/10 rounded-full">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleShare}
          className="text-white hover:bg-white/10 rounded-full"
        >
          <Share2 size={20} strokeWidth={1.5} />
        </Button>
        <div className="w-[1px] h-4 bg-white/10" />
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleCopy}
          className="text-white hover:bg-white/10 rounded-full"
        >
          {copied ? <Check size={20} strokeWidth={1.5} className="text-primary" /> : <Copy size={20} strokeWidth={1.5} />}
        </Button>
        <div className="w-[1px] h-4 bg-white/10" />
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleDownload}
          className="text-white hover:bg-white/10 rounded-full"
        >
          <Download size={20} strokeWidth={1.5} />
        </Button>
      </div>
    </motion.div>
  )
}
