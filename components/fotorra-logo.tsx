"use client"
import Image from "next/image"
import type { FC } from "react"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  variant?: "default" | "white"
  showText?: boolean
  className?: string
}

const sizeMap = { sm: 32, md: 40, lg: 48 }

const FotochiLogo: FC<LogoProps> = ({ size = "md", variant = "default", showText = true, className = "" }) => {
  const dimension = sizeMap[size]
  const textSize = size === "sm" ? "text-lg" : size === "lg" ? "text-3xl" : "text-xl"
  const colorClass = variant === "white" ? "text-white" : "text-gray-900"

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image src="/fotochi-logo.png" alt="Fotochi logo" width={dimension} height={dimension} priority />
      {showText && <span className={`${textSize} font-bold ${colorClass}`}>Fotochi</span>}
    </div>
  )
}

export default FotochiLogo
