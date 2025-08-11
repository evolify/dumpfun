"use client"
import React from "react"
import { useMobile } from "@/hooks/media"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { cn } from "@/lib/utils"

interface Props {
  className?: string
  children: React.ReactNode
  open: boolean
  onClose: () => void
}

export default function Modal(props: Props) {
  const { open, onClose, children, className } = props
  const isMobile = useMobile()

  function onOpenChange(open: boolean) {
    if (!open) {
      onClose()
    }
  }

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerHeader className="sr-only">
          <DrawerTitle></DrawerTitle>
        </DrawerHeader>
        <DrawerContent className={cn(className, "rounded-t-2xl!")}>
          {children}
        </DrawerContent>
      </Drawer>
    )
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader className="sr-only">
        <DialogTitle></DialogTitle>
      </DialogHeader>
      <DialogContent className={className}>{children}</DialogContent>
    </Dialog>
  )
}
