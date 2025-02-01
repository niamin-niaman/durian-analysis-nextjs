"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const [isRecording, setIsRecording] = useState(false)
  const [hasRecording, setHasRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        const url = URL.createObjectURL(audioBlob)
        setAudioUrl(url)
        setHasRecording(true)
        setIsRecording(false)
      }

      mediaRecorder.start()
      setIsRecording(true)
      setHasRecording(false)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      alert("ไม่สามารถเข้าถึงไมโครโฟนได้ กรุณาอนุญาตการใช้งานไมโครโฟน")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
    }
  }

  const playRecording = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl)
      audio.play()
    }
  }

  const handleRecordClick = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  const handleAnalyze = () => {
    router.push("/result")
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md flex flex-col items-center space-y-8 p-8 rounded-lg border border-gray-200">
        {/* Header Text */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-gray-800">วิเคราะห์ความสุกของทุเรียนด้วยเสียง</h1>
          <p className="text-gray-600">
            {hasRecording ? "กด re-record เพื่อบันทึกใหม่" : "กดปุ่ม Record เพื่อบันทึกเสียงเคาะ"}
          </p>
        </div>

        {/* Waveform Icon */}
        <div className="flex items-center space-x-1">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={`w-1.5 bg-gray-800 transition-all duration-500 ${
                isRecording ? "animate-pulse" : ""
              }`}
              style={{
                height: `${Math.sin((i + 1) * 0.8) * 20 + 25}px`
              }}
            />
          ))}
        </div>
        
        {/* Button Group */}
        <div className="w-full space-y-4">
          {/* Record/Re-record Button */}
          <button 
            onClick={handleRecordClick}
            className={`w-full py-3 px-6 text-gray-800 border-2 border-gray-800 rounded hover:bg-gray-50 transition-colors
              ${isRecording ? "bg-red-50 border-red-500 text-red-500" : ""}`}
          >
            {isRecording ? "Stop" : hasRecording ? "Re-record" : "Record"}
          </button>

          {/* Conditional Content - Only show if there's a recording */}
          {hasRecording && (
            <>
              <p className="text-gray-600 text-center">เสียงถูกบันทึกแล้ว กด Analyze เพื่อวิเคราะห์</p>
              {/* Play Button */}
              <button 
                onClick={playRecording}
                className="w-full py-3 px-6 text-gray-800 border-2 border-gray-800 rounded hover:bg-gray-50 transition-colors"
              >
                Play
              </button>

              {/* Analyze Button */}
              <button 
                onClick={handleAnalyze}
                className="w-full py-3 px-6 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Analyze
              </button>
            </>
          )}
        </div>

        {/* Recording Status */}
        {isRecording && (
          <p className="text-red-500 animate-pulse">Recording...</p>
        )}
      </div>
    </main>
  )
}
