export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md flex flex-col items-center space-y-8 p-8 rounded-lg border border-gray-200">
        {/* Waveform Icon */}
        <div className="flex items-center space-x-1">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 bg-gray-800"
              style={{
                height: `${Math.sin((i + 1) * 0.8) * 20 + 25}px`
              }}
            />
          ))}
        </div>
        
        {/* Record Button */}
        <button 
          className="w-full py-3 px-6 text-gray-800 border-2 border-gray-800 rounded hover:bg-gray-50 transition-colors disabled:opacity-50"
          disabled
        >
          record
        </button>
      </div>
    </main>
  )
}
