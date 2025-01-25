"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function ResultPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState<string | null>(null)

  useEffect(() => {
    // Simulate analysis delay
    const timer = setTimeout(() => {
      setLoading(false)
      // Randomly select a result
      const results = ["สุก", "กลาง", "ไม่สุก"]
      const randomResult = results[Math.floor(Math.random() * results.length)]
      setResult(randomResult)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md flex flex-col items-center space-y-8 p-8 rounded-lg border border-gray-200">
        {loading ? (
          <div className="flex flex-col items-center justify-center w-full space-y-4">
            {/* Loading Spinner with Pulse Effect */}
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
              <div className="absolute inset-0 w-16 h-16 border-4 border-gray-800 rounded-full animate-pulse opacity-20" />
            </div>
            <p className="text-gray-600 animate-pulse text-center">กำลังวิเคราะห์เสียง...</p>
          </div>
        ) : (
          <div className="space-y-8 text-center w-full">
            <h2 className="text-2xl font-medium text-gray-800">ผลการวิเคราะห์</h2>
            
            {/* Result Display with Animation */}
            <div 
              className={`
                text-4xl font-bold p-8 rounded-lg animate-fade-in
                ${result === "สุก" ? "text-green-600" : 
                  result === "กลาง" ? "text-yellow-600" : 
                  "text-red-600"}
              `}
            >
              <div className="mb-2">{result}</div>
              <div className="text-base text-gray-500 font-normal">
                {result === "สุก" ? "พร้อมรับประทาน" : 
                  result === "กลาง" ? "รอได้อีก 2-3 วัน" : 
                  "ยังไม่พร้อมรับประทาน"}
              </div>
            </div>

            {/* Back Button */}
            <button
              onClick={() => router.push("/")}
              className="px-6 py-3 text-gray-800 border-2 border-gray-800 rounded hover:bg-gray-50 transition-colors"
            >
              ตรวจสอบใหม่
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
