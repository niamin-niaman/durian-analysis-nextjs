import type { Metadata } from "next"
import { Kanit } from "next/font/google"
import "./globals.css"

const kanit = Kanit({ 
  weight: ['300', '400', '500', '600'],
  subsets: ["latin", "thai"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Durian Ripeness Analysis",
  description: "Analyze durian ripeness through sound",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="th">
      <body className={kanit.className}>{children}</body>
    </html>
  )
}
